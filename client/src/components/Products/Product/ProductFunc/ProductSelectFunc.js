import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import classes from "./ProductSelectFunc.module.css";

const ProductSelectFunc = (props) => {
  /* 用戶狀態 */
  const isUserLoggedIn = useSelector((state) => state.login.isUserLoggedIn);
  const userInfo = useSelector((state) => state.login.userInfo);

  /* 切換頁面 */
  const navigate = useNavigate();

  const pageChangeHandler = () => {
    navigate("/service", {
      state: {
        funcType: "form",
        replyType: "商品問題",
        replyTitle: `商品 "${props.fetchProduct.product_name}" 問題`,
        replyText: `我在商品 "${props.fetchProduct.product_name}" 遇到了問題，`,
      },
    });
  };

  return (
    <div className={classes.productSelectFunc}>
      <div
        className={`${classes.selectBtn} ${
          isUserLoggedIn ? null : classes.btnNotAllow
        } ${props.selectFunc === "評論" ? classes.selected : null}`}
        onClick={() => props.onSelectFunc("評論")}
      >
        <img src="/images/UI/Product/button/like.svg" />
        <span>評論</span>
      </div>
      <div
        className={`${classes.selectBtn} ${
          props.selectFunc === "留言區" ? classes.selected : null
        }`}
        onClick={() => props.onSelectFunc("留言區")}
      >
        <img src="/images/UI/Product/button/comment.svg" />
        <span>留言區</span>
      </div>
      <div
        className={`${classes.selectBtn} ${
          props.selectFunc === "推薦商品" ? classes.selected : null
        }`}
        onClick={() => props.onSelectFunc("推薦商品")}
      >
        <img src="/images/UI/Product/button/happy.svg" />
        <span>推薦商品</span>
      </div>
      <div
        className={`${classes.selectBtn} ${
          isUserLoggedIn ? null : classes.btnNotAllow
        } ${props.selectFunc === "回報問題" ? classes.selected : null}`}
        onClick={pageChangeHandler}
      >
        <img src="/images/UI/Product/button/service.svg" />
        <span>回報問題</span>
      </div>
    </div>
  );
};

export default ProductSelectFunc;
