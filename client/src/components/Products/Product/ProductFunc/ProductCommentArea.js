import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../../constants";

import ProductComment from "./ProductComment";

import classes from "./ProductCommentArea.module.css";

const ProductCommentArea = (props) => {
  const [reviews, setReviews] = useState([]); // 獲取評論、評分、評分者
  const [sort, setSort] = useState("new"); // 排列方式：新到舊、舊到新

  /* 獲取評論/評分/評論人 */
  useEffect(() => {
    const fetchReciews = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/products/api/product_all_reviews_select/${props.product_id}`
        );
        setReviews(response.data);
      } catch (err) {
        console.error("product_all_reviews_select 錯誤", err);
      }
    };
    fetchReciews();
  }, [props.product_id]);

  /* 排列順序處理器 */
  const sortChanageHandler = (e) => {
    setSort(e.target.value);
  };

  return (
    <div className={classes.productCommentArea}>
      <div className={classes.titleContainer}>
        <span className={classes.title}>留言區</span>
        {/* 排列方式 */}
        <div className={classes.sort}>
          <span>排列順序：</span>
          <select onChange={sortChanageHandler} value={sort}>
            <option value="new">由新到舊</option>
            <option value="old">由舊到新</option>
          </select>
        </div>
      </div>
      <div className={classes.area}>
        {sort === "new" ? (
          reviews.length === 0 ? (
            <span className={classes.noComment}>
              目前還沒有人留言，歡迎您成為第一人!
            </span>
          ) : (
            reviews.map((review) => (
              <ProductComment key={reviews.username} fetchReview={review} />
            ))
          )
        ) : reviews.length === 0 ? (
          <span className={classes.noComment}>
            目前還沒有人留言，歡迎您成為第一人!
          </span>
        ) : (
          [...reviews] // reverse()會影響原始arr，故使用拷貝版本，避免原始的被反覆反轉
            .reverse()
            .map((review) => (
              <ProductComment key={reviews.username} fetchReview={review} />
            ))
        )}
      </div>
    </div>
  );
};

export default ProductCommentArea;
