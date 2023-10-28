const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "歡迎來到關於我們!" });
});

module.exports = router;
