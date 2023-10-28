/* 設定登入 */
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const config = require("../routes/CRUD/config");

// passport.authenticate 驗證的策略
passport.use(
  new LocalStrategy((username, password, done) => {
    let sql = "SELECT * FROM users WHERE username = ?";
    config.query(sql, [username], (err, results) => {
      if (err) return done(err);
      const user = results[0];
      if (!user) return done(null, false, { message: "此用戶不存在。" });

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return done(err);
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "密碼輸入錯誤。" });
        }
      });
    });
  })
);

/* 登入時，將用戶物件保存到 session */
// 完成 passport.authenticate 驗證後，將用戶物件保存到 session，這裡我只保存 id
passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser((user_id, done) => {
  let sql =
    "SELECT *, TIMESTAMPDIFF(YEAR, birthday, CURDATE()) AS current_age FROM users WHERE user_id = ?";
  config.query(sql, [user_id], (err, results) => {
    const user = results[0];
    done(err, user);
  });
});

module.exports = passport;
