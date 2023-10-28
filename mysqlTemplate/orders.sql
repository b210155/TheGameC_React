CREATE TABLE orders ( -- 商品訂單資料表
    order_id INT AUTO_INCREMENT PRIMARY KEY, -- 商品訂單編號
    user_id INT NOT NULL, -- 購買商品的會員
    product_id JSON NOT NULL, -- 該次購買的所有商品id
    order_date DATE NOT NULL, -- 購買日期
    total_price INT UNSIGNED NOT NULL, -- 該次購買的總金額
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
