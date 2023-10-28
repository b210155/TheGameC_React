import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../../../../constants";

import UserPItem from "./UserPItem";
import classes from "./UserProducts.module.css";

const UserProducts = (props) => {
  /* 用戶狀態 */
  const isUserLoggedIn = useSelector((state) => state.login.isUserLoggedIn);
  const userInfo = useSelector((state) => state.login.userInfo);

  const [userProducts, setUserProducts] = useState([]); // 用戶已擁有的商品
  const [inputValue, setInputValue] = useState(""); // input 值狀態
  const [searchState, setSeachState] = useState(false); // 搜尋功能觸發

  /* 已購買的商品 */
  useEffect(() => {
    if ((isUserLoggedIn, userInfo)) {
      const fetchOrder = async () => {
        try {
          const response = await axios.get(
            `${API_URL}/products/api/mult_product_select?user_id=${userInfo.user_id}&search_productName=${inputValue}`
          );
          setUserProducts(response.data);
        } catch (err) {
          console.error("錯誤獲取 mult_product_select:", err);
          setUserProducts([]);
        }
      };
      fetchOrder();
    } else {
      setUserProducts([]);
    }
  }, [isUserLoggedIn, searchState]);

  /* input狀態處理 */
  const inputChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  /* 搜尋按鈕 */
  const searchBtnHandler = () => {
    setSeachState((prev) => !prev);
  };

  return (
    <div className={classes.userProducts}>
      {/* 標題 */}
      <div className={classes.titleContainer}>
        <span className={classes.title}>我的商品</span>
        <span className={classes.amount}>共 {userProducts.length} 筆</span>
      </div>
      <div className={classes.separator}></div>
      {/* 搜尋欄位 */}
      <div className={classes.searchBar}>
        <img src="/images/UI/Nav/search.svg" alt="搜尋圖標" />
        <input type="text" onChange={inputChangeHandler} value={inputValue} />
        <button onClick={searchBtnHandler}>搜尋</button>
      </div>
      {/* 商品欄位 */}
      <div className={classes.itemContainer}>
        {userProducts.length === 0 ? (
          <span className={classes.noProduct}>搜索不到商品</span>
        ) : (
          userProducts.map((item) => (
            <UserPItem key={`user_product_id${item.product_id}`} item={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default UserProducts;
