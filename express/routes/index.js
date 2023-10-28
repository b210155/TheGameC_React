const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "歡迎來到首頁!" });
});

module.exports = router;
