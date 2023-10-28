import React from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../../constants";

import classes from "./UserPItem.module.css";

const UserPItem = (props) => {
  /* 前往商品網頁 */
  const navigate = useNavigate();
  const toPage = () => {
    navigate(`/product/${props.item.product_id}`);
  };

  return (
    <div
      className={classes.userPItem}
      title={props.item.product_name}
      onClick={toPage}
    >
      <div className={classes.imgContainer}>
        <img
          src={API_URL + "/static/images/products/" + props.item.image}
          alt="商品圖片"
        />
      </div>
    </div>
  );
};

export default UserPItem;
