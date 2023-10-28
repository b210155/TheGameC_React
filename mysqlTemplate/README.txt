
1. 請確保將資勞夾內的資料表都建立在資料庫中！！
2. 先建立 users 和 products，再建立其他的
3. products.sql 除了建立資料表外，還要將其下方資料全部 INSERT 進 products 資料表內






-- 一些實用的 sql code --

-- users.sql
SELECT * FROM `users` WHERE 1; -- 獲取用戶
SELECT EXISTS( SELECT 1 FROM users WHERE user_id = 1 ) AS user_exists; -- 查詢是否存在

-- products.sql
UPDATE products SET buy_count = buy_count + 1 WHERE product_id IN (?); -- 購買的商品(們)，購買數 +1 

-- product_reviews.sql
SELECT ROUND(AVG(rating), 1) AS average_ratin FROM product_review WHERE product_id = ?; -- 獲取平均分數

-- token.sql
-- upsert 語法
INSERT INTO password_reset_tokens (username, resetToken) VALUES (?, ?) ON DUPLICATE KEY UPDATE resetToken = VALUES(resetToken);
-- 當資料不存在 => insert 資料
-- 當資料已存在 => update 資料