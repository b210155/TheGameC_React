import React from "react";
import { API_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";

import classes from "./HomePopularImg.module.css";

const HomePopularImg = (props) => {
  /* 前往商品網頁 */
  const navigate = useNavigate();
  const toPage = () => {
    navigate(`/product/${props.selectProduct.product_id}`);
  };

  return (
    <React.Fragment>
      <img
        className={classes.homePopularImg}
        src={`${API_URL}/static/images/products/${props.selectProduct.image}`}
        alt="商品大圖"
      />
      <div className={classes.homePopularImgInfo}>
        <h2>《{props.selectProduct.product_name}》</h2>
        <span className={classes.description}>
          {props.selectProduct.description}
        </span>
        <span className={classes.toPage} onClick={() => toPage()}>
          前往網頁
        </span>
      </div>
    </React.Fragment>
  );
};

export default HomePopularImg;
