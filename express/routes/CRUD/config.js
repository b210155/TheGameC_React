require("dotenv").config({ path: ".env.development" }); // 讀取環境變數
const mysql = require("mysql");

/* 環境變數 */
const { DB_host, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;
// 沒拿到的錯誤處理
if (!DB_host || !DB_PORT || !DB_USER || !DB_PASSWORD || !DB_DATABASE) {
  throw new Error("config.js 缺少必要的環境變數");
}

/* 資料庫設定 */
const db = mysql.createConnection({
  host: DB_host,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  multipleStatements: true, // 可協帶多個指令出去
});
db.connect(function (err, connection) {
  if (err) {
    console.log("【資料庫連線錯誤...】", err.sqlMessage);
  } else {
    console.log("【資料庫連線成功...】");
  }
});

module.exports = db;
