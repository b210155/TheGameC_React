import React from "react";
import { API_URL } from "../../../constants";

import classes from "./SearchItem.module.css";

const SearchItem = (props) => {
  return (
    <div className={classes.searchItem} onClick={props.onNavigate}>
      {props.item.buy_count >= 10000 ? (
        <span className={classes.hot}>HOT</span>
      ) : null}
      <div className={classes.imgContainer}>
        <img
          src={API_URL + "/static/images/products/" + props.item.image}
          alt="商品圖"
        />
      </div>
      <div className={classes.info}>
        <span className={classes.itemName}>{props.item.product_name}</span>
        <span className={classes.download}>{props.item.product_type}</span>
      </div>
    </div>
  );
};

export default SearchItem;
