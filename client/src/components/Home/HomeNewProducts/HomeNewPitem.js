import React from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../constants";

import classes from "./HomeNewPitem.module.css";

const HomeNewPitem = (props) => {
  const navigate = useNavigate();
  const toPage = () => {
    navigate(`/product/${props.fetchProduct.product_id}`);
  };

  return (
    <div
      className={classes.homeNewPitem}
      onClick={toPage}
      title={props.fetchProduct.product_name}
    >
      <img
        src={`${API_URL}/static/images/products/${props.fetchProduct.image}`}
        alt="最新商品"
      />
    </div>
  );
};

export default HomeNewPitem;
