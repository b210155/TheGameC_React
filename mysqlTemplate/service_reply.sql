-- 客服資料表
CREATE TABLE service_reply ( 
  service_id INT PRIMARY KEY AUTO_INCREMENT, 
  user_id INT NOT NULL,  -- 會員
  category VARCHAR(10) NOT NULL, -- 回報類別
  subject TEXT NOT NULL, -- 填入主旨
  description TEXT NOT NULL, -- 說明欄位
  is_resolved BOOLEAN NOT NULL DEFAULT 0, -- 問題是否解決? 0 / 1
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);