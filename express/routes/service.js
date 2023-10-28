const express = require("express");
const router = express.Router();
const config = require("./CRUD/config");

/* 獲取客服表單資料 */
router.get("/service_select", (req, res) => {
  const { user_id } = req.query;
  var sql = "Select * from service_reply where user_id = ?;";
  config.query(sql, [user_id], (err, results) => {
    if (err)
      return res.status(500).json({
        error: "service_select：獲取 service_reply 錯誤",
        details: err,
      });
    res.json(results);
  });
});

/* 新增客服表單 */
router.post("/service_insert", (req, res) => {
  const { user_id } = req.query;
  const { category, subject, description } = req.body;

  // 最大字數驗證
  if (subject.length > 15 || description.length > 255) {
    return res.status(400).json({
      error: "表單錯誤",
      message: "主旨或說明內容超過最大允許長度",
    });
  }

  var sql =
    "INSERT INTO service_reply (user_id, category, subject, description) VALUES (?, ?, ?, ?);";
  config.query(
    sql,
    [user_id, category, subject, description],
    (err, results) => {
      if (err)
        return res.status(500).json({
          error: "service_insert：獲取 service_reply 錯誤",
          details: err,
          message: "很抱歉，客服系統出現問題，請您稍後再次嘗試。",
        });
      res.json({
        message: "您的回饋已發送置客服信箱，我們會盡快為您處理。",
      });
    }
  );
});

/* 更改客服表單資料 () */
router.put("/service_is_resolved_update", (req, res) => {
  const { service_id } = req.body;
  var sql = "UPDATE service_reply SET is_resolved = 1 WHERE service_id IN (?);";
  config.query(sql, [service_id], (err, results) => {
    if (err)
      return res.status(500).json({
        error: "service_is_resolved_update：獲取 service_reply 錯誤",
        details: err,
      });
    res.json({ message: "更動成功!" });
  });
});

module.exports = router;
