import React from "react";
import CartItems from "./CartItems";

import Image from "../UI/Image/Image";
import classes from "./Cart.module.css";

const Cart = (props) => {
  return (
    <div className={classes.Cart}>
      <div className={classes.CartTitle}>
        <div className={classes.title}>
          <Image
            src="/images/UI/common_button/shoppingCart_black.svg"
            alt="購物車"
          />
          <span>購物車</span>
        </div>
        <div className={classes.openFormBtn} onClick={props.onDialogOpen}>
          <Image src="/images/UI/ShoppingCart/credit.svg" alt="結帳" />
          <span>我要結帳</span>
        </div>
      </div>
      {props.fetchCart.length > 0 ? (
        <div className={classes.CartItemsContainer}>
          {props.fetchCart.map((item) => (
            <CartItems
              key={"Cart" + item.cart_id}
              item={item}
              onDel={props.onDel}
            />
          ))}
        </div>
      ) : (
        <div className={classes.nothingInCart}>
          <a href="/products">您的購物車內沒有任何商品，點我前往商品頁面</a>
        </div>
      )}
      <div className={classes.toTop}>
        <a href="#">回到頂部</a>
      </div>
    </div>
  );
};

export default Cart;
