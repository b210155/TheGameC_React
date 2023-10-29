-- 專案：TheGameC | 遊戲購買平台 --

-- 介紹 --
個人作品
主題：模擬用戶購買商品的平台
架構：首頁、商店、商品、購物車、客服、關於我們、個人資訊、登入頁
功能：購物車、登入/註冊、第三方登入(Google)、修改密碼(Email驗證)、客服表單、搜索功能、留言/評論功能
開發方式：
        後端：Express (Node.js)
        前端：React
        資料庫：MySQL


-- 結構 --
1. client 目錄為前端，使用 React 專案製作
2. express 目錄為後端，使用 Node.js 及 Express 製作
3. mysqlTemplate 目錄存放建立資料庫時所需要用到的指令和網站所需的資料表


-- 事前準備 -- 
1. 資料庫建立，提供於 mysqlTemplate (詳閱 README.txt)
2. 填入環境變數值，client、express 皆有 (詳閱 README.txt)