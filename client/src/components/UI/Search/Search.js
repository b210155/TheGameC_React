import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { API_URL } from "../../../constants";

import Image from "../Image/Image";
import Backdrop from "../Backdrop";
import SearchForm from "./SearchForm";
import SearchResult from "./SearchResult";

import classes from "./Search.module.css";

const Search = (props) => {
  const [searchResult, setSearchResult] = useState([]); // 搜尋結果
  const [allProduct, setAllProduct] = useState(); // 所有商品

  /* 所有商品 */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/products/api/products_select`
        );
        setAllProduct(response.data);
      } catch (err) {
        console.error("錯誤獲取 products_select:", err);
      }
    };
    fetchProducts();
  }, []);

  /* 送出結果 */
  const fetchSearchResult = async (keyword) => {
    try {
      const response = await axios.get(
        `${API_URL}/products/api/products_search?keyword=${keyword}`
      );
      setSearchResult(response.data);
    } catch (err) {
      console.error("錯誤獲取 products_search:", err);
    }
  };

  // 使用傳送門
  return ReactDOM.createPortal(
    <div>
      <Backdrop onDialogClose={props.onDialogClose} title="任意點擊退出畫面" />
      <div className={classes.search}>
        {/* 關閉搜索 */}
        <Image
          className={classes.closeBtn}
          src="/images/UI/common_button/cancel.svg"
          alt="關閉搜索"
          title="關閉搜索"
          onClick={props.onDialogClose}
        />
        {/* 搜索 bar + 結果 */}
        <SearchForm onFetch={fetchSearchResult} fetchProducts={allProduct} />
        {searchResult ? (
          <SearchResult
            items={searchResult}
            setSearchState={props.setSearchState}
          />
        ) : null}
      </div>
    </div>,
    document.getElementById("portal-root") // 指向 index.html #portal-root 元素
  );
};

export default Search;
