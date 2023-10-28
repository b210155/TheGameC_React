import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import ProductSelectFunc from "./ProductSelectFunc";
import ProductRate from "./ProductRate";
import ProductCommentArea from "./ProductCommentArea";
import ProductRecommend from "./ProductRecommend";

import classes from "./ProductFunc.module.css";

const ProductFunc = (props) => {
  /* 用戶狀態 */
  const isUserLoggedIn = useSelector((state) => state.login.isUserLoggedIn);

  /* 選擇功能狀態 */
  const [selectFunc, setSelectFunc] = useState("評論");

  /* 每次進到商品單頁，功能都是從 "評論" 開始 */
  useEffect(() => {
    setSelectFunc("評論");
  }, [props.product_id]);

  /* 選擇功能函數 */
  const funcChangeHandler = (func) => {
    setSelectFunc(func);
  };

  /* 選擇的功能UI */
  const selectFuncUI = (func) => {
    switch (func) {
      case "評論":
        return isUserLoggedIn ? (
          <ProductRate
            text="評論"
            product_id={props.product_id}
            renewRating={props.renewRating}
          />
        ) : (
          <span className={classes.notLogin}>登入後才能使用評分功能。</span>
        );
        break;
      case "留言區":
        return (
          <ProductCommentArea text="留言區" product_id={props.product_id} />
        );
        break;
      case "推薦商品":
        return (
          <ProductRecommend
            text="推薦商品"
            fetchProduct={props.fetchProduct}
            product_id={props.product_id}
            selectFunc={selectFunc}
          />
        );
        break;
    }
  };

  return (
    <div className={classes.productFunc}>
      <ProductSelectFunc
        onSelectFunc={funcChangeHandler}
        selectFunc={selectFunc}
        fetchProduct={props.fetchProduct}
      />
      {selectFuncUI(selectFunc)}
    </div>
  );
};

export default ProductFunc;
