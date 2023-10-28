/* 登入和註冊路由 */
require("dotenv").config({ path: ".env.development" }); // 讀取環境變數
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("../../auth/passportSetup");
const config = require("./config");
const nodemailer = require("nodemailer"); // 寄送 mail
const jwt = require("jsonwebtoken"); // 令牌生成工具 (當用戶重置密碼時，生成唯一令牌，將其與用戶的帳戶相關聯)
const { OAuth2Client } = require("google-auth-library"); // 第三方登入

/* 用到的環境變數 */
const {
  MAIL_USER,
  MAIL_PASS,
  GOOGLE_CLIENT_ID,
  GOOGLE_SECRET_KEY,
  HOST,
  JWT_SECRET,
  CLIENT_HOST,
} = process.env;
// 沒拿到的錯誤處理
if (
  !MAIL_USER ||
  !MAIL_PASS ||
  !GOOGLE_CLIENT_ID ||
  !GOOGLE_SECRET_KEY ||
  !HOST ||
  !JWT_SECRET ||
  !CLIENT_HOST
) {
  throw new Error("auth.js 缺少必要的環境變數");
}

// 確認用戶資料是否重複函式 (用 Promise 使檢查同步，能照順序檢查，且避免 callBack hell)
async function checkUserDataDuplicate(field, value) {
  return new Promise((resolve, reject) => {
    config.query(
      `SELECT * FROM users WHERE ${field} = ?`,
      [value],
      (err, result) => {
        if (err)
          reject({
            status: 500,
            error: `users_${field} 查詢錯誤`,
            details: err,
          });
        else resolve(result.length > 0);
      }
    );
  });
}

/* 註冊 */
router.post("/register", async (req, res) => {
  const { username, password, email, phone, birthday } = req.body;
  // 檢查用戶名稱和email是否已存在，await確保checkUserDataDuplicate完成後才密碼加密，避免同時進行。(兩者為異步，不這麼做可能會同時進行)
  try {
    if (await checkUserDataDuplicate("username", username))
      return res
        .status(409)
        .json({ error: "username已存在", message: "該使用者名稱已存在" });
    if (await checkUserDataDuplicate("email", email))
      return res
        .status(409)
        .json({ error: "email已存在", message: "該電子信箱已被使用" });

    // 設定加密密碼
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err)
        return res
          .status(500)
          .json({ error: "register_bcrypt.hash 錯誤", details: err });

      // 儲存至資料庫
      let sql =
        "INSERT INTO users (username, password, email, phone, birthday) VALUES (?, ?, ?, ?, ?)";
      config.query(
        sql,
        [username, hashedPassword, email, phone, birthday],
        (err, result) => {
          if (err)
            return res
              .status(500)
              .json({ error: "register_儲存至資料庫 錯誤", details: err });
          res.json({ message: "會員註冊成功!" });
        }
      );
    });
  } catch (err) {
    res.status(500).json({ error: "register 錯誤", details: err });
  }
});

/* 登入 */
// post 資料保密性更高 (get 會顯示於網址)
router.post("/login", (req, res, next) => {
  const { username } = req.body;

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json(info);
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      // 登入成功後，順便將該用戶資料傳到 redux，方便之後的狀態管理
      let sql =
        "SELECT *, TIMESTAMPDIFF(YEAR, birthday, CURDATE()) AS current_age FROM users WHERE username = ?;";
      config.query(sql, [username], (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ error: "login：傳送用戶資料至 redux 出錯" });

        let encodedUser = JSON.stringify(results[0]);
        res.cookie("userInfo", encodedUser); // 儲存到Cookie
        res.json({ message: "登入成功", user: results[0] });
      });
    });
  })(req, res, next);
});

/* 訪問登入對象 (可用於例如客戶端頁面的渲染) */
router.get("/check-session", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      message: "用戶已登入",
      user: req.user,
      sessionID: req.sessionID,
    });
  } else {
    res.json({ message: "用戶未登入" });
  }
});

/* 登出 */
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
    } else {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ error: "登入出錯" });
        }
        res.clearCookie("connect.sid");
        res.clearCookie("userInfo");
        return res.json({ message: "登出成功" });
      });
    }
  });
});

////////////////////////
////* 修改密碼 */ //////
///////////////////////
/* 設置nodemailer */
let transporter = nodemailer.createTransport({
  // 發信者的 mail
  service: "Gmail",
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

/* 隨機驗證碼生成 */
const generateVerifyCode = () => {
  return Math.floor(Math.random() * 1000000).toString(); // 6位數
};

/* 令牌存在時間 */
const tokenExpires = 5; // 設定 token 在3分鐘後過期

///////////////////////////////
/* 路由：設置發送信件至用戶信箱 */
router.post("/password_reset_mail_verify", (req, res) => {
  const { username } = req.body;

  // 獲取用戶的 email
  let sql = "SELECT email FROM users WHERE username = ?;";
  config.query(sql, [username], (err, results) => {
    if (err)
      return res.status(500).json({
        error: "password_reset_mail_verify：查詢用戶發生錯誤",
        details: err,
        message: "系統寄送驗證碼發生錯誤，請您稍後再試",
      });
    if (results.length === 0)
      return res.status(404).json({
        error: "password_reset_mail_verify：用戶不存在",
        message: "您輸入的使用者名稱不存在，請檢查有無輸入錯誤",
      });
    const email = results[0].email;

    // 生成驗證碼
    const verifyCode = generateVerifyCode();

    // 生成 token(令牌) 與到期時間
    const resetToken = jwt.sign(
      {
        username: username,
        email: email,
        verifyCode: verifyCode,
      },
      JWT_SECRET, // 密鑰，用於簽署和驗證JWT token
      {
        expiresIn: `${tokenExpires}m`, // 設定 token 在3分鐘後過期
      }
    );

    // 將該用戶的 restToken 傳至資料庫 password_reset_tokens 保存
    // 資料不存在 => insert；資料存在 => update
    let sql_insertToken =
      "INSERT INTO password_reset_tokens (username, resetToken) VALUES (?, ?) ON DUPLICATE KEY UPDATE resetToken = VALUES(resetToken);";
    config.query(sql_insertToken, [username, resetToken], (err, results) => {
      if (err)
        return res.status(500).json({
          error:
            "password_reset_mail_verify 錯誤：token 新增或更新至資料庫 password_reset_tokens 時錯誤",
          detail: err,
          message: "系統寄送驗證碼發生錯誤，請您稍後再試",
        });
    });

    // 設定驗證mail
    let mailOption = {
      from: MAIL_USER,
      to: email,
      subject: "TheGameC 密碼重設驗證",
      html: `<h2>TheGameC 密碼重設驗證</h2><p style="font-weight:600">您的驗證碼是：${verifyCode}</p>
    <p>請於${tokenExpires}分鐘內完成密碼修改，逾時請獲取新的驗證碼</p><p>* 若有寄送多個驗證碼，請以最新的為主。</p>`,
    };

    /* 寄送信件 */
    transporter.sendMail(mailOption, (err, info) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: "password_reset_mail_verify 錯誤：transporter，驗證碼發送失敗",
          details: err,
          message: "系統寄送驗證碼發生錯誤，請您稍後再試",
        });
      }
      res.json({
        message: `驗證碼已發送成功，請至您的信箱查看，並於${tokenExpires}分鐘內完成修改密碼流程`,
      });
    });
  });
});

/* 驗證 JWT 函數 (修改密碼 token) */
const verifyToken = (token, secretKey, res) => {
  try {
    // 使用 jsonwebtoken 的 verify 來驗證 token
    const decoded = jwt.verify(token, secretKey);
    // 成功返回
    return decoded;
  } catch (err) {
    console.error("JWT 驗證失敗:", err.message);
    return null;
  }
};

//////////////////
/* 路由:修改密碼 */
router.put("/password_reset", async (req, res) => {
  /* 用戶輸入的 */
  const { verifyCode, newPassword, username } = req.body.passwordState;

  let sql_userSelect =
    "SELECT EXISTS( SELECT 1 FROM users WHERE username = ?) AS user_exists;";
  config.query(sql_userSelect, [username], (err, results) => {
    try {
      if (err)
        return res.status(500).json({
          error: "password_reset：從 users 查詢用戶發生錯誤",
          details: err,
          message: "系統修改密碼時發生異常，請您稍後再試",
        });
      if (results[0].user_exists === 0) throw new Error("UserNotExist");
      /* 從資料庫獲取 restToken */
      let sql_insertToken =
        "SELECT resetToken FROM password_reset_tokens WHERE username = ?;";
      config.query(sql_insertToken, [username], (err, results) => {
        if (err)
          return res.status(500).json({
            error:
              "password_reset_tokens selesct 錯誤：從資料庫選取 token 錯誤",
            detail: err,
            message: "系統修改密碼時發生異常，請您稍後再試",
          });

        // 處理
        try {
          // 驗證碼不存在 (確認results是否有東西)
          if (results.length === 0) throw new Error("TokenNotExist");

          // 解析 JWT token
          let decodedToken = verifyToken(
            results[0].resetToken,
            JWT_SECRET,
            res
          );

          // 驗證碼不存在
          if (!decodedToken) throw new Error("TokenNotExist");

          // 驗證輸入的使用者名稱是否符合 (以防用戶寄完驗證後又更改)
          if (decodedToken.username !== username)
            throw new Error("UsernameMismatch"); // (錯誤丟到 catch，為了讓傳到前端的訊息能統一在一樣的屬性)

          // 驗證輸入的驗證碼是否符合
          if (decodedToken.verifyCode !== verifyCode)
            throw new Error("VerifyCodeMismatch"); // (錯誤丟到 catch，為了讓傳到前端的訊息能統一在一樣的屬性)

          // 設定加密新密碼
          bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
            if (err)
              return res.status(500).json({
                error: "password_reset bcrypt.hash 錯誤：新密碼 hash 加密錯誤",
                details: err,
                message: "系統修改密碼時發生異常，請您稍後再試",
              });

            // 儲存至資料庫
            let sql = "UPDATE users SET password = ? WHERE username = ?;";
            config.query(sql, [hashedPassword, username], (err) => {
              if (err)
                return res.status(500).json({
                  error: "password_reset 錯誤：新密碼更新至資料表時錯誤 ",
                  details: err,
                  message: "系統修改密碼時發生異常，請您稍後再試",
                });
              res.json({ message: "密碼修改成功" });
            });
          });
        } catch (err) {
          // token驗證碼不存在或無效
          if (
            err.name === "JsonWebTokenError" ||
            err.message === "TokenNotExist"
          )
            return res.status(401).json({
              error: "password_reset JWT 驗證錯誤：無效的token或格式錯誤",
              details: err,
              message: "您輸入的驗證碼是無效或過期的，請確保已經獲取驗證碼",
            });
          // token驗證碼過期
          if (err.name === "TokenExpiredError")
            return res.status(401).json({
              error: "password_reset JWT 驗證錯誤：該token已經過期",
              details: err,
              message: "該帳戶的驗證碼已經過期，請先獲取新的驗證碼",
            });
          // 輸入的用戶名稱與token不相符
          if (err.message === "UsernameMismatch")
            return res.status(401).json({
              error: "password_reset 錯誤：輸入的使用者名稱與token不相符",
              details: err,
              message: "您的使用者名稱與先前輸入不同，請檢查是否有做改動",
            });
          // 輸入的驗證碼與token不相符
          if (err.message === "VerifyCodeMismatch")
            return res.status(401).json({
              error: "password_reset 錯誤：輸入的驗證碼與token不相符",
              details: err,
              message: "您輸入的驗證碼是無效的，請確保與收到的信件相同",
            });
          // 其他問題
          return res.status(500).json({
            error: "password_reset 錯誤：其他問題，詳細請看 details",
            details: err,
            message: "系統修改密碼時發生異常，請您稍後再試",
          });
        }
      });
    } catch (err) {
      if (err.message === "UserNotExist")
        return res.status(401).json({
          error: "password_reset：從 users 查詢用戶發生錯誤",
          details: err,
          message: "您輸入的使用者名稱不存在，請檢查有無輸入錯誤",
        });
    }
  });
});

/////////////////////////////////
////* 第三方登入：Google */ //////
/////////////////////////////////
/* 1. 用戶端設置 */
const client = new OAuth2Client({
  clientId: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_SECRET_KEY,
  redirectUri: `${HOST}/login/google/callback`,
});

/* 2. 授權路由 */
router.post("/google/login", (req, res) => {
  // 產生 Google 授權 URL，若要取得額外資訊，在 scope 參數中加入對應欄位
  const authorizeUrl = client.generateAuthUrl({
    access_type: "offline",
    scope: [
      // 控制獲取那些資料
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/user.birthday.read",
    ],
  });
  res.redirect(authorizeUrl); // 重新定向至 Google 授權頁面
});

/* 隨機數生成器 */
// 用於生成 google 用戶的帳號密碼
function generateShortId(wordLength) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < wordLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

/* 3. 回傳路由 */
router.get("/google/callback", async (req, res) => {
  const { code } = req.query; // google 返回的授權碼，用於交換訪問令牌和刷新令牌

  try {
    // 授權碼換取token
    const { tokens } = await client.getToken(code); // 包含用於訪問 Google API 的訪問令牌（access_token）和刷新令牌（refresh_token）
    client.setCredentials(tokens); // 將這些令牌設置為 OAuth2.0 客戶端的憑證，客戶端就能使用這些令牌來認證後續的 Google API 請求

    // 透過 Google API 獲取用戶資訊
    const userInfo = await client.request({
      url: "https://www.googleapis.com/oauth2/v3/userinfo",
    });
    const userBirthday = await client.request({
      url: "https://people.googleapis.com/v1/people/me?personFields=birthdays",
    });

    /* 確認 email 是否已註冊過，來決定是否註冊用戶 */
    let sql = "SELECT user_id FROM `users` WHERE email = ?;";
    config.query(sql, [userInfo.data.email], (err, results) => {
      if (err) return res.sendStatus(500);
      /* 如果帳戶不存在 => 先註冊 */
      if (results.length < 1) {
        // 獲取生日
        let { year, month, day } = userBirthday.data.birthdays[0].date;
        let birthday = `${year}-${String(month).padStart(2, "0")}-${String(
          day
        ).padStart(2, "0")}`;

        // 密碼加密 + 加入 users
        let password = `Google${generateShortId(5)}`;
        bcrypt.hash(password, 10, (err, hashedPassword) => {
          if (err)
            return res
              .status(500)
              .json({ error: "google_password.hash 錯誤", details: err });
          // 存到資料庫
          let sql_register =
            "INSERT INTO users (username, password, email, birthday, nickname, registration_platform) VALUES (?, ?, ?, ?, ?, ?);";
          config.query(
            sql_register,
            [
              `Google${generateShortId(7)}`,
              hashedPassword,
              userInfo.data.email,
              birthday,
              userInfo.data.name,
              "google",
            ],
            (err, results) => {
              if (err) {
                return res
                  .status(500)
                  .send("google用戶加入 users 錯誤：/google/callback");
              }
            }
          );
        });
      }

      // 創建 JWT (後傳入 cookie，驗證時調用)
      const token = jwt.sign(userInfo.data, JWT_SECRET);
      res.cookie("token", token, { httpOnly: true }); // httpOnly 增加cookie安全性

      req.session.userInfo = userInfo.data; // 用戶資料存入session，方便 /google/user 調用
      res.redirect("/login/google/user"); // 跳轉回前端頁面
    });
  } catch (err) {
    console.error(err);
    res.status(400).send("獲取 Google user info 錯誤");
  }
});

/* 4. 驗證 JWT 函數 (第三方登入) */
const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;
  // 驗證 JWT token
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next(); // 驗證成功，進行下一個程序
    });
  } else {
    res.sendStatus(401);
  }
};

/* 5. 路由：獲取 google 用戶資料 */
router.get("/google/user", authenticateJWT, async (req, res) => {
  try {
    // 登入成功後，順便將該用戶資料傳到 redux，方便之後的狀態管理
    let sql =
      "SELECT *, TIMESTAMPDIFF(YEAR, birthday, CURDATE()) AS current_age FROM users WHERE email = ?;";
    config.query(sql, [req.session.userInfo.email], (err, results) => {
      if (err)
        return res
          .status(500)
          .json({ error: "login：傳送用戶資料至 redux 出錯" });

      // 用戶資料存成 cookie 方便前端調用
      const encodedUser = encodeURIComponent(JSON.stringify(results[0])); // cookie存中文會是亂碼，因此要先編碼
      res.cookie("userInfo", encodedUser); // 儲存到Cookie
      res.clearCookie("token"); // 儲存到Cookie
      res.redirect(`${CLIENT_HOST}/login`); // 重新導向到前端頁面
    });
  } catch (err) {
    console.error(err);
    res.status(400).send("獲取 user info 錯誤");
  }
});

module.exports = router;
