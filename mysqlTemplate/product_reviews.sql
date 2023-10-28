CREATE TABLE product_reviews ( --  商品評分/評論
  product_review_id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  user_id INT NOT NULL,
  rating TINYINT UNSIGNED NOT NULL, -- 評分
  comment TEXT, -- 評論
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(product_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  UNIQUE (product_id, user_id), -- 一個遊戲，一個會員只能評論一次
  CHECK (rating <= 5) -- 評分最多為5分
);
 