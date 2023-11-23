import React from "react";
import { useSelector } from "react-redux";
import { URL, API_URL } from "../../../constants";

import Image from "../../UI/Image/Image";
import classes from "./PItem.module.css";

const PItem = (props) => {
  /* 登入狀態 */
  const isUserLoggedIn = useSelector((state) => state.login.isUserLoggedIn);
  return (
    <div
      className={`${classes.pItem} ${
        props.dataFetchOrder.includes(props.item.product_id) ? classes.buy : ""
      }`}
    >
      <div className={classes.productImgContainer}>
        <img
          src={API_URL + "/static/images/products/" + props.item.image}
          alt="商品圖片"
        />
      </div>
      <div className={classes.productInfo}>
        <a
          className={classes.name}
          href={URL + `/product/${props.item.product_id}`}
          title={`前往 ${props.item.product_name} 頁面`}
        >
          《{props.item.product_name}》
        </a>
        <span>售價：{props.item.price} NT$</span>
        <div
          className={
            classes.addCartBtn +
            " " +
            (props.dataFetchCart.includes(props.item.product_id)
              ? classes.InCart
              : "")
          }
          onClick={
            isUserLoggedIn
              ? () =>
                  props.onAddtoCart(
                    props.item.product_id,
                    props.item.price,
                    props.item.age_rating
                  )
              : () => alert("登入後方可使用購物車功能。")
          }
          title="加入購物車"
        >
          {/* 使用條件運算子與字串組合時，要用括號把條件運算子包住，
          否則會因為運算子的優先級而得到不預期的結果 */}
          <Image
            src="/images/UI/common_button/shoppingCart_white.svg"
            alt="購物車"
          />
        </div>
      </div>
    </div>
  );
};
export default PItem;
