import React from "react";
import { API_URL, URL } from "../../constants";

import Image from "../UI/Image/Image";
import classes from "./CartItems.module.css";

const CartItems = (props) => {
  /* 年齡分類 */
  const getAgeRating = (rating) => {
    switch (rating) {
      case "18":
        return "限制級 18+";
      case "12":
        return "輔導級 12+";
      case "6":
        return "保護級 6+";
      default:
        return "普遍級";
    }
  };
  return (
    <div className={classes.CartItem}>
      <div className={classes.cimgContainer}>
        <img src={API_URL + "/static/images/products/" + props.item.image} />
      </div>
      <div className={classes.cnameContainer}>
        <a
          href={`${URL}/product/${props.item.product_id}`}
          className={classes.name}
        >
          {props.item.product_name}
        </a>
      </div>
      <div className={classes.ctypeContainer}>
        <span>{getAgeRating(props.item.age_rating)}</span>
      </div>
      <div className={classes.ccostContainer}>
        <span>NT$ {props.item.price}</span>
      </div>
      <div className={classes.cdelContainer}>
        <Image
          src="/images/UI/common_button/trash.svg"
          onClick={() => props.onDel(props.item.cart_id)}
          title="從購物車中移除"
        />
      </div>
    </div>
  );
};

export default CartItems;
