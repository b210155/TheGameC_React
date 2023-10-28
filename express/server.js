require("dotenv").config({ path: ".env.development" }); // 讀取環境變數
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser"); // 解讀 cookie

const { CLIENT_HOST, HOST_PORT } = process.env;
// 沒拿到的錯誤處理
if (!CLIENT_HOST || !HOST_PORT) {
  throw new Error("server.js 缺少必要的環境變數");
}

/* 設定誰可連進來 */
const setting = {
  origin: [CLIENT_HOST], // 設定此人可以進來，url 尾端不要有斜線
  credentials: true, // 登入時，若要用到 cookies 或 session 時需要
  // 跨域請求時，瀏覽器默認不會包含cookies或其他認證信息。
  // 即使你在伺服器端設置了session和cookies，它們也不會被自動附加到跨域請求中。
  // 若要附帶，則要在後端 cors 設置 credentials: true,
  // 以及在前端請求(axios、fetch...)設置 withCredentials: true
};
app.use(cors(setting)); // 允許所有 cors 請求

/* 其他中介 */
app.use(express.json()); // 用於解析 JSON 格式資料
app.use(express.urlencoded({ extended: true })); // 用於解析 URL 編碼的資料
app.use("/static", express.static(path.join(__dirname, "public"))); // 設定 public 資料夾網址
app.use(cookieParser()); // 解析 cookie

/* 登入功能需要 */
const session = require("express-session");
const passport = require("./auth/passportSetup");
app.use(
  session({
    secret: "secret_demo",
    resave: false,
    saveUninitialized: true,
  })
);
// passport必要的中介軟體，如下兩者
app.use(passport.initialize()); // passport初始化，啟動passport以便對輸入的請求進行身份驗證
app.use(passport.session()); // 通常存儲用戶ID，在session中持續存儲和查找用戶數據

/*--- 導入網頁路由 ---*/
const indexPage = require("./routes/index"); // 首頁
const aboutPage = require("./routes/about"); // 關於我們
const shoppingCartPage = require("./routes/shoppingCart"); // 購物車
const productsPage = require("./routes/products"); // 商品
const loginPage = require("./routes/CRUD/auth"); // 登入頁面
const userPage = require("./routes/user"); // 個人資訊
const servicePage = require("./routes/service"); // 客服

/*--- 設定路由 ---*/
app.use("/api", indexPage); // 首頁
app.use("/about/api", aboutPage); // 關於我們
app.use("/shoppingCart/api", shoppingCartPage); // 購物車
app.use("/products/api", productsPage); // 商品
app.use("/login/", loginPage); // 登入
app.use("/user/api", userPage); // 用戶
app.use("/service/api", servicePage); // 客服

/*--- 網頁 404 ---*/
app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

/*--- 伺服器 ---*/
const Port = HOST_PORT;
app.listen(Port, () => {
  console.log(`【伺服器 port ${Port} 啟動 - 代理商 TheGameC】`);
  console.log("【Ctrl + C 可關閉伺服器】");
});
