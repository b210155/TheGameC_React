-- 密碼重設 tokens
CREATE TABLE password_reset_tokens (
    username VARCHAR(255) NOT NULL,
    resetToken TEXT NOT NULL, -- token
    PRIMARY KEY (username)
);