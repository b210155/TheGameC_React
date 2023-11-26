import React, { useState, useEffect } from "react";
import { API_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";

import classes from "./HomePopularImg.module.css";
import animations from "../../../animations/animations.module.css";

const HomePopularImg = (props) => {
  /* 切換動畫 */
  const [animation, setAnimation] = useState("");
  useEffect(() => {
    setAnimation(animations.animation_brightness);
    const timer = setTimeout(() => {
      setAnimation("");
    }, 500);
    return () => clearTimeout(timer);
  }, [props.selectProduct.image]);

  /* 前往商品網頁 */
  const navigate = useNavigate();
  const toPage = () => {
    navigate(`/product/${props.selectProduct.product_id}`);
  };

  return (
    <React.Fragment>
      <img
        className={`${classes.homePopularImg} ${animation}`}
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
