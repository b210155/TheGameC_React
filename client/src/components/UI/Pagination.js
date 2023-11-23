import React, { useState, useEffect } from "react";

import classes from "./Pagination.module.css";

const Pagination = (props) => {
  /* 分頁 */
  const [currentPage, setCurrentPage] = useState(1); // 當前/初始分頁

  /* 總頁數 */
  const pageLimit = props.pageLimit || 6; // 一頁x個
  const totalItems = props.items.length;
  const totalPages = Math.ceil(totalItems / pageLimit); // 幾頁 (總商品數 / x)

  /* 設定每當觸發什麼時，分頁就從第一頁開始，ex.切換類型 */
  useEffect(() => {
    setCurrentPage(1);
  }, [props.resetPage]);

  /* 當前頁數處理器 */
  const pageChangeHandler = (page) => {
    // 獲得當前頁和總頁數
    const startIndex = (page - 1) * pageLimit;
    const endIndex = startIndex + pageLimit;
    const PageShowItems = props.items.slice(startIndex, endIndex); // 顯示哪些 items
    // 設定當前頁數和傳該頁會顯示的內容到父元件去做顯示
    setCurrentPage(page);
    props.onGetPageItems(PageShowItems);
  };

  /* 首次畫面渲染 + 每當當前頁、顯示項目、顯示數量有更動時，調用當前頁數處理器 */
  useEffect(() => {
    /* 若 pageLimit 有變化，ex. 畫面大小變化 */
    const newTotalPages = Math.ceil(props.items.length / pageLimit); // newTotalPages 用來處理 pageLimit 有變化的情況
    // 如果當前頁碼超過了新的總頁數，則重設當前頁碼至最後一頁 (*limit 3頁數多餘6，所以必須設置，否則頁碼超出後回到6的同頁碼會找無頁碼導致空白)
    if (currentPage > newTotalPages && newTotalPages > 0) {
      // 初次渲染 newTotalPages 為 0，為了避免 currentPage 大於 newTotalPages，使得 pageChangeHandler(0)，導致初次渲染沒資料，
      // 還需多判斷 newTotalPages 大於 0，否則正常渲染 pageChangeHandler(currentPage);
      pageChangeHandler(newTotalPages);
    } else {
      /* 若 pageLimit 沒變化，正常渲染 */
      pageChangeHandler(currentPage);
    }
  }, [currentPage, props.items, pageLimit]);

  return (
    <div className={classes.pagination}>
      <div>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => pageChangeHandler(index + 1)}
            disabled={currentPage === index + 1}
            className={currentPage === index + 1 ? classes.currentPage : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
