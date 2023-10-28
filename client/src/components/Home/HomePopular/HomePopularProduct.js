import React from "react";
import { API_URL } from "../../../constants";
import classes from "./HomePopularProduct.module.css";

const HomePopularProduct = (props) => {
  return (
    <div
      className={classes.homePopularProduct}
      onClick={() => props.onSelect(props.fetchProduct)}
    >
      <img
        src={`${API_URL}/static/images/products/${props.fetchProduct.image}`}
      />
    </div>
  );
};

export default HomePopularProduct;
