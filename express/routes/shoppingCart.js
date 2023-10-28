const express = require("express");
const router = express.Router();
const config = require("./CRUD/config");

/* 提取用戶 "所有" 的購物車清單和該車商品內容 */
router.get("/shoppingCart_select", (req, res) => {
  const user_id = req.query.user_id;
  const sql =
    "SELECT shopping_carts.*, products.product_name, products.age_rating, products.image FROM shopping_carts JOIN products ON shopping_carts.product_id = products.product_id WHERE shopping_carts.user_id = ?;";
  config.query(sql, [user_id], function (err, results) {
    if (err)
      return res
        .status(500)
        .json({ error: "shoppingCart_select 錯誤", details: err });
    res.json(results);
  });
});

/* 提取用戶 "選定" 的購物車清單和該車商品內容 ( 以用戶id和商品id來選定 ) */
router.get("/single_shoppingCart_select", (req, res) => {
  const { product_id, user_id } = req.query;
  const sql =
    "SELECT shopping_carts.*, products.product_name, products.age_rating, products.image FROM shopping_carts JOIN products ON shopping_carts.product_id = products.product_id WHERE shopping_carts.product_id = ? AND shopping_carts.user_id = ?;";
  config.query(sql, [product_id, user_id], function (err, results) {
    if (err)
      return res
        .status(500)
        .json({ error: "single_shoppingCart_select 錯誤", details: err });
    res.json(results);
  });
});

/* 商品加入購物車 */
router.post("/shoppingCart_insert", (req, res) => {
  const { user_id, product_id, price } = req.body;
  const sql =
    "INSERT INTO shopping_carts (user_id, product_id, price) VALUES (?, ?, ?);";
  config.query(sql, [user_id, product_id, price], (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ error: "shoppingCart_insert 錯誤", details: err });
    res.json({ message: "商品成功加入購物車!" });
  });
});

/* 從購物車中移除商品 (刪除該筆 cart_id) */
router.delete("/shoppingCart_delete", (req, res) => {
  const { cart_id } = req.body;
  const sql = "DELETE FROM shopping_carts WHERE cart_id=?;";
  config.query(sql, [cart_id], (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ error: "shoppingCart_delete 錯誤", details: err });
    res.json({ message: "商品成功從購物車移除!" });
  });
});

/* 購買購物車的商品 */
// 步驟一： 將商品加入 order.spl  // 步驟二： 選中的 cart_id 移除
router.post("/dealComplete", (req, res) => {
  const { user_id, product_id, order_date, total_price } = req.body;

  // 新增進 order
  const sql_order_insert =
    "INSERT INTO orders (user_id, product_id, order_date, total_price) VALUES (?, ?, ?, ?);";
  config.query(
    sql_order_insert,
    [user_id, product_id, order_date, total_price],
    (err, results) => {
      if (err)
        return res.status(500).json({
          error: "dealCompletely 錯誤：商品加入 order 發生錯誤",
          details: err,
        });

      // products.buy_count + 1
      const pID_arr = JSON.parse(product_id);
      const sql_products_update =
        "UPDATE products SET buy_count = buy_count + 1 WHERE product_id IN (?);";
      config.query(sql_products_update, [pID_arr], (err, results) => {
        if (err)
          return res.status(500).json({
            error: "dealCompletely 錯誤：products buy_count +1  發生錯誤",
            details: err,
          });
        res.json({ message: "交易成功！商品存入您的收藏空間" });
      });
    }
  );
});

module.exports = router;
