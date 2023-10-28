import React from "react";
import { API_URL } from "../../../../constants";

import classes from "./ProductComment.module.css";

const ProductComment = (props) => {
  return (
    <div className={classes.productComment}>
      <div className={classes.left}>
        <div className={classes.imgContainer}>
          <img
            src={
              props.fetchReview.avatar
                ? `${API_URL}/static/${props.fetchReview.avatar}`
                : "/images/UI/User/avatar_default.jpg"
            }
            alt="大頭照"
          />
        </div>
        <span className={classes.name}>
          {props.fetchReview.nickname || props.fetchReview.username}
        </span>
        <span className={classes.date}>{props.fetchReview.created_date}</span>
        <span className={classes.rate}>{props.fetchReview.rating}</span>
      </div>
      <div className={classes.separate}></div>
      <div className={classes.right}>
        <span className={classes.title}>評論</span>
        <textarea
          className={classes.comment}
          value={props.fetchReview.comment}
          readOnly
        />
      </div>
    </div>
  );
};

export default ProductComment;
