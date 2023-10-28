CREATE TABLE users ( -- 會員資料表
user_id INT AUTO_INCREMENT PRIMARY KEY,  -- 會員 id
username VARCHAR(15) NOT NULL UNIQUE, -- 會員帳號
password VARCHAR(255) NOT NULL,  -- 會員密碼 (因為使用 bcrypt.hash() 加密，所以需要更多的字。)
email VARCHAR(30) NOT NULL UNIQUE,  -- email
phone VARCHAR(11),  -- 電話
birthday DATE NOT NULL,  -- 生日
nickname VARCHAR(15), -- 暱稱 (預設為帳號)
avatar VARCHAR(255) DEFAULT '', -- 大頭貼
registration_platform ENUM('local', 'google', 'facebook') NOT NULL DEFAULT 'local',
registration_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- 帳號建立時間
);


