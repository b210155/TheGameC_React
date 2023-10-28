const express = require("express");
const router = express.Router();
const config = require("./CRUD/config");

/* 商品 */
router.get("/products_select", (req, res) => {
  var sql = "SELECT * FROM products;";
  config.query(sql, function (err, results) {
    if (err)
      return res
        .status(500)
        .json({ error: "products_select：獲取 products 錯誤", details: err });
    res.json(results);
  });
});

/* 訂單 (已購買的商品) */
// order.spl
router.get("/orders_select", (req, res) => {
  const user_id = req.query.user_id;
  const sql = "SELECT * FROM orders WHERE user_id = ?;";
  config.query(sql, [user_id], (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ error: "order_select：獲取 orders 錯誤", details: err });
    res.json(results);
  });
});

/* 商品搜索 */
router.get("/products_search", (req, res) => {
  const { keyword } = req.query;
  const sql = "SELECT * FROM `products` WHERE `product_name` LIKE ?";
  config.query(sql, [`%${keyword}%`], (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ error: "products_search：獲取 products 錯誤", details: err });
    res.json(results);
  });
});

/* 選取單個商品 */
router.get("/single_product_select/:product_id", (req, res) => {
  const { product_id } = req.params;
  const sql = "SELECT * FROM `products` WHERE `product_id` = ?";
  config.query(sql, [product_id], (err, results) => {
    if (err)
      return res.status(500).json({
        error: "single_product_select：獲取 products 錯誤",
        details: err,
      });
    res.json(results);
  });
});

/* 選取多個商品 (這是選取用戶已擁有的所有商品，搭配搜索功能：用於"我的商品"頁面) */
router.get("/mult_product_select", (req, res) => {
  const { user_id, search_productName } = req.query;

  try {
    // 先從 orders 選出並合併各訂單的購買商品陣列成一個陣列
    const sql = "SELECT * FROM orders WHERE user_id = ?;"; // 選取 orders
    config.query(sql, [user_id], (err, results) => {
      if (err)
        return res.status(500).json({
          error: "mult_product_select：獲取 orders 錯誤",
          details: err,
        });

      const productIds = results.reduce((acc, curr) => {
        return acc.concat(JSON.parse(curr.product_id));
      }, []);
      // 得到陣列後，依陣列的 product_id 去 products 選取相對應的商品 IN(?) 可放入多個 product_id
      // 接著尋找 product_name 符合的商品
      const sql2 =
        "SELECT * FROM `products` WHERE `product_id` IN (?) AND `product_name` LIKE ?;";
      config.query(
        sql2,
        [productIds, `%${search_productName}%`],
        (err, results2) => {
          if (err)
            return res.status(500).json({
              error: "mult_product_select：獲取 products 錯誤",
              details: err,
            });
          res.json(results2);
        }
      );
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "mult_product_select：獲取 products 錯誤", details: err });
  }
});

////////////////////////////////////////////////
/* 商品評論 */ //////////////////////////////////
////////////////////////////////////////////////

/* 用戶_商品_評論 (選擇：依據商品 + 用戶) */
router.get("/product_reviews_select/:product_id", (req, res) => {
  const { product_id } = req.params;
  const { user_id } = req.query;
  const sql =
    "SELECT * FROM product_reviews WHERE user_id = ? AND product_id = ?;";
  config.query(sql, [user_id, product_id], (err, results) => {
    if (err)
      return res.status(500).json({
        error: "product_reviews_select：獲取 product_reviews 錯誤",
        details: err,
      });
    res.json(results[0]);
  });
});

/* 用戶_商品_評論 (新增) */
router.post("/product_reviews_insert/:product_id", (req, res) => {
  const { product_id } = req.params;
  const { user_id } = req.query;
  const { rating, comment } = req.body;
  const sql =
    "INSERT INTO product_reviews (product_id, user_id, rating, comment) VALUES (?, ?, ?, ?);";
  config.query(sql, [product_id, user_id, rating, comment], (err, results) => {
    if (err)
      return res.status(500).json({
        error: "product_reviews_insert：獲取 product_reviews 錯誤",
        details: err,
      });
    res.json({ message: "您的評論張貼成功!" });
  });
});

/* 用戶_商品_評論 (修改) */
router.put("/product_reviews_update/:product_id", (req, res) => {
  const { product_id } = req.params;
  const { user_id } = req.query;
  const { rating, comment } = req.body;
  const sql =
    "UPDATE product_reviews SET rating = ?, comment = ? WHERE user_id = ? AND product_id = ?;";
  config.query(sql, [rating, comment, user_id, product_id], (err, results) => {
    if (err)
      return res.status(500).json({
        error: "product_reviews_insert：獲取 product_reviews 錯誤",
        details: err,
      });
    res.json({ message: "您的評論修改成功!" });
  });
});

/* 用戶_商品_評論 (刪除) */
router.delete("/product_reviews_delete/:product_id", (req, res) => {
  const { product_id } = req.params;
  const { user_id } = req.query;
  const sql =
    "DELETE FROM product_reviews WHERE user_id = ? AND product_id = ?;";
  config.query(sql, [user_id, product_id], (err, results) => {
    if (err)
      return res.status(500).json({
        error: "product_reviews_delete：獲取 product_reviews 錯誤",
        details: err,
      });
    res.json({ message: "您的評論已經刪除!" });
  });
});

/* 獲取某商品的所有評論 (由時間排列) */
router.get("/product_all_reviews_select/:product_id", (req, res) => {
  const { product_id } = req.params;
  const sql =
    "SELECT pr.rating, pr.comment, DATE_FORMAT(pr.created_at, '%Y年%m月%d日') AS created_date, u.nickname, u.avatar, u.username FROM product_reviews pr JOIN users u ON pr.user_id = u.user_id WHERE pr.product_id = ? ORDER BY pr.created_at DESC;";
  config.query(
    sql,
    [product_id], // 名稱照 /: 打
    function (err, results) {
      if (err)
        return res.status(500).json({
          error: "product_all_reviews_delete：獲取 product_reviews 錯誤",
          details: err,
        });
      res.json(results);
    }
  );
});

/* 獲取某商品的平均分數 */
router.get("/product_reviews_rating_select/:product_id", (req, res) => {
  const { product_id } = req.params;
  const sql =
    "SELECT ROUND(AVG(rating), 1) AS average_rating FROM product_reviews WHERE product_id = ?;";
  config.query(sql, [product_id], (err, results) => {
    if (err)
      return res.status(500).json({
        error: "product_reviews_rating_select：獲取 product_reviews 錯誤",
        detail: err,
      });
    res.json(results);
  });
});

////////////////////////////////////////////////
/* 推薦商品  */ /////////////////////////////////
////////////////////////////////////////////////
/* 獲取商品類型 (依 product_type) */
router.get("/product_type_select/", (req, res) => {
  const { product_type } = req.query;
  const sql =
    "SELECT * FROM products WHERE product_type = ? ORDER BY RAND() LIMIT 3;";
  config.query(sql, [product_type], function (err, results) {
    if (err)
      return res.status(500).json({
        error: "product_type_select：獲取 products 錯誤",
        details: err,
      });
    res.json(results);
  });
});

/* 選出最熱門的多個商品 */
router.get("/product_hot_select/", (req, res) => {
  const sql = "SELECT * FROM products ORDER BY buy_count DESC LIMIT 10;";
  config.query(sql, function (err, results) {
    if (err)
      return res.status(500).json({
        error: "product_hot_select：獲取 products 錯誤",
        details: err,
      });
    res.json(results);
  });
});

/* 選擇最新的15個商品 */
router.get("/product_new_select/", (req, res) => {
  const sql = "SELECT * FROM products ORDER BY product_id DESC LIMIT 18;";
  config.query(sql, function (err, results) {
    if (err)
      return res.status(500).json({
        error: "product_new_select：獲取 products 錯誤",
        details: err,
      });
    res.json(results);
  });
});

module.exports = router;
