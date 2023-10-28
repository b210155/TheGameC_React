import React, { useEffect, useState } from "react";

import Pagination from "../UI/Pagination";

import classes from "./ServiceQA.module.css";

const QA = [
  {
    id: "1",
    q: "網站的主旨是什麼？",
    ans: "本網站模擬了一個以販賣遊戲為主的購物網站，網站中有提供：登入/註冊、購物車、購買商品、用戶資訊、照片上傳、搜索欄位、留言/評分等諸多功能。",
  },
  {
    id: "2",
    q: "網站的架構使用了什麼？",
    ans: "本網站的是以 Express 作為後端伺服器、React 作為用戶端而建成的網站，資料庫則是使用了 MySQL 並以 MAMP 進行管理。先由後端獲取資料庫的資料作成 API 路由，在由用戶端進行取用(使用 axios)，最後將資訊渲染於畫面；除了查看資料外，也在用戶端提供了各種修改資料的工具。在一部分的狀態管理中使用了 Redux 來進行，例如：用戶登入。此外也有做了響應式設計，畫面能隨螢幕變化。",
  },
  {
    id: "3",
    q: "如何創建一個帳戶？",
    ans: "要創建一個帳戶，請點選導覽列中的人頭圖示，點擊後將會進入登入頁面，您可以在此選擇註冊功能。在註冊時，會需要提供您的使用者名稱、密碼、常用電子信箱、電話號碼、出生日期等訊息，這些訊息將會被存入資料庫中，密碼的部分使用 bcrypt.hash() 進行加密，以防被任意查看。",
  },
  {
    id: "4",
    q: "成為用戶有那些功能?",
    ans: "在網站中，若您想要購買遊戲或將遊戲添加進購物車時，需要先登入帳戶才可以進行操作。此外，用戶可以點選導覽列上的個人資訊欄位，進入屬於您自己的頁面，可以在此查看並更新用戶資訊，也能查詢購買紀錄和已擁有的商品。",
  },
  {
    id: "5",
    q: "網站內的商品都是存在的嗎？",
    ans: "由於這只是個模擬的購物網站，因此商品並非是真實存在的。您的一切購買行為將會使商品存於購物車或您的商品庫中，主要目的是用於模擬用戶購買商品的流程。",
  },
];

const ServiceQA = () => {
  /* 分頁設定 */
  let pageLimit = 3;
  const [showItems, setShowItems] = useState([]);
  const pageItemsHandler = (items) => {
    setShowItems(items);
  };

  return (
    <div className={classes.serviceQA}>
      <span className={classes.title}>常見問題</span>
      {showItems.map((qa) => (
        <div key={qa.id} className={classes.QAcontainer}>
          <span className={classes.title}>問題 {qa.id}</span>
          <span>Q：{qa.q}</span>
          <div className={classes.ans}>
            <span>A：{qa.ans}</span>
          </div>
        </div>
      ))}
      <Pagination
        items={QA}
        pageLimit={pageLimit}
        onGetPageItems={pageItemsHandler}
      />
    </div>
  );
};

export default ServiceQA;
