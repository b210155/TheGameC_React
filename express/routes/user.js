const express = require("express");
const router = express();
const config = require("./CRUD/config");
const multer = require("multer"); // 上傳不同類型檔案，ex. 圖片(大頭照)

/* 獲取用戶資料 */
router.get("/user_select", (req, res) => {
  const user_id = req.query.user_id;
  var sql =
    "SELECT *, TIMESTAMPDIFF(YEAR, birthday, CURDATE()) AS current_age FROM users WHERE user_id = ?;";
  config.query(sql, [user_id], (err, results) => {
    if (err)
      return res.status(500).json({ error: "user_select", details: err });
    res.json(results[0]);
  });
});

/* 修改用戶資料(暱稱、電話) */
router.post("/user_info_update", (req, res) => {
  const { nickname, phone, user_id } = req.body;

  // 先確認 email 是否有重複
  // var checkEmailSql = "SELECT * FROM users WHERE email = ? AND user_id != ?";
  // config.query(checkEmailSql, [email, user_id], (err, results) => {
  //   if (err) {
  //     console.error("Email 檢查出現錯誤：", err);
  //     return res.status(500).json({
  //       error: "email_check_failed",
  //       details: "Internal Server Error",
  //     });
  //   }
  //   if (results.length > 0) {
  //     return res.status(400).json({
  //       error: "email_already_exists",
  //       details: "Email 已經被其他用戶使用",
  //       message: "該 Email 已被使用。",
  //     });
  //   }

  // 確認 email無重複，再進行更新操作
  var sql = "UPDATE users SET nickname = ?, phone = ? WHERE user_id = ?";
  config.query(sql, [nickname, phone, user_id], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "user_info_update",
        details: err,
      });
    }
    res.json({ message: "資料成功修改!" });
  });
  // });
});

/* 修改用戶資料(大頭照) */
// 大頭貼上傳事先設定
const avatarStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/uploads/Avatar/"); // 上傳至此路徑
  },
  filename: function (req, file, cb) {
    cb(null, "avatar_" + Date.now() + "." + file.originalname.split(".")[1]); // 上傳檔名
  },
});
const avatar_upload = multer({ storage: avatarStorage });

// 上傳圖片
router.post("/avatar_upload", avatar_upload.single("avatar"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      error: "未收到上傳資料",
      details: err,
    });
  }
  const filePath = `/images/uploads/Avatar/${req.file.filename}`;
  res.json({ filePath });
});

// 修改大頭照
router.put("/user_avatar_update", (req, res) => {
  const { avatar, user_id } = req.body;
  var sql = "UPDATE users SET avatar = ? WHERE user_id = ?";
  config.query(sql, [avatar, user_id], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "user_avatar_update",
        details: err,
      });
    }
    res.json({ message: "大頭照成功修改!" });
  });
});
module.exports = router;
