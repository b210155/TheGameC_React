import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import classes from "./ProductRate.module.css";
import { API_URL } from "../../../../constants";

const ProductRate = (props) => {
  /* 用戶狀態 */
  const userInfo = useSelector((state) => state.login.userInfo);

  /* 評分、評論 */
  const [rating, setRating] = useState(5); // 評分
  const [comment, setcomment] = useState(""); // 評論
  const [rateExists, setRateExists] = useState(false); // 評論(分)是否已經存在

  /* 評分函數 */
  const ratingChangeHandler = (e) => {
    setRating(parseInt(e.target.value));
  };
  /* 評論函數 */
  const commentChangeHandler = (e) => {
    setcomment(e.target.value);
  };

  /* 導入評論 */
  useEffect(() => {
    if (userInfo) {
      const fetchRate = async () => {
        try {
          const response = await axios.get(
            `${API_URL}/products/api/product_reviews_select/${props.product_id}?user_id=${userInfo.user_id}`
          );
          if (response.data.rating) {
            setRating(response.data.rating);
            setcomment(response.data.comment);
            setRateExists(true);
          } else {
            setRating(5);
            setcomment("");
            setRateExists(false);
          }
        } catch (err) {
          console.error("product_reviews_select 錯誤", err);
        }
      };
      fetchRate();
    }
  }, [props.product_id]);

  /* 新增評論 */
  const postRateHandler = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/products/api/product_reviews_insert/${props.product_id}?user_id=${userInfo.user_id}`,
        { rating: rating, comment: comment }
      );
      alert(response.data.message);
      setRateExists(true);
      props.renewRating((prev) => !prev); // ProductInfo 獲取新的平均分數
    } catch (err) {
      console.error("product_reviews_insert 錯誤", err);
    }
  };

  /* 修改評論 */
  const updateRateHandler = async () => {
    try {
      const response = await axios.put(
        `${API_URL}/products/api/product_reviews_update/${props.product_id}?user_id=${userInfo.user_id}`,
        { rating: rating, comment: comment }
      );
      alert(response.data.message);
      props.renewRating((prev) => !prev); // ProductInfo 獲取新的平均分數
    } catch (err) {
      console.error("product_reviews_update 錯誤", err);
    }
  };

  /* 刪除評論 */
  const deleteRateHandler = async () => {
    try {
      const response = await axios.delete(
        `${API_URL}/products/api/product_reviews_delete/${props.product_id}?user_id=${userInfo.user_id}`
      );
      alert(response.data.message);
      setRating(5);
      setcomment("");
      setRateExists(false);
      props.renewRating((prev) => !prev); // ProductInfo 獲取新的平均分數
    } catch (err) {
      console.error("product_reviews_delete 錯誤", err);
    }
  };

  return (
    <div className={classes.productRate}>
      {/* 評分 */}
      <div className={classes.rating}>
        <div>
          <span className={classes.title}>評分：</span>
          <select onChange={ratingChangeHandler} value={rating}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <span className={classes.title}>您的評分：{rating}</span>

        {rateExists ? (
          <span className={classes.rateExists}>已評論</span>
        ) : (
          <span className={classes.rateNotExists}>尚未評論</span>
        )}
      </div>
      {/* 評論 */}
      <div>
        <div className={classes.comment}>
          <span className={classes.title}>撰寫評論</span>
          <textarea
            value={comment}
            placeholder="請分享您對本商品的想法"
            onChange={commentChangeHandler}
          />
          <div className={classes.btnContainer}>
            <div>
              <button
                type="button"
                onClick={updateRateHandler}
                className={rateExists ? null : classes.notAllow}
              >
                修改
              </button>
              <button
                type="button"
                onClick={deleteRateHandler}
                className={rateExists ? null : classes.notAllow}
              >
                刪除
              </button>
            </div>
            <button
              type="button"
              onClick={postRateHandler}
              className={rateExists ? classes.notAllow : null}
            >
              張貼
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductRate;
