import React, { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_URL, IS_LOGGED_IN_KEY } from "../../constants";

import Cart from "./Cart";
import PayForm from "./PayForm";
import classes from "./ShoppingCart.module.css";
import Dialog from "../UI/Dialog";

const ShoppingCart = (props) => {
  /* 登入狀態 */
  const isUserLoggedIn = useSelector((state) => state.login.isUserLoggedIn);
  const userInfo = useSelector((state) => state.login.userInfo);
  const session_Login = sessionStorage.getItem(IS_LOGGED_IN_KEY);

  const [cart, setCart] = useState([]); // 購物車商品
  const [payForm, setPayForm] = useState(); // 開啟|關閉購買表單

  /* 若未登入，則進入登入頁面 */
  const navigate = useNavigate();
  useEffect(() => {
    if (session_Login !== "1" && !isUserLoggedIn) {
      navigate("/login", {
        state: {
          openWarning: true,
          text: "您尚未登入帳號，登入後即可使用【購物車】功能。",
        },
      });
    }
  }, [isUserLoggedIn, session_Login, navigate]);

  /* 獲取購物車資訊 */
  useEffect(() => {
    if (isUserLoggedIn) {
      axios
        .get(
          `${API_URL}/shoppingCart/api/shoppingCart_select?user_id=${userInfo.user_id}`
        )
        .then((response) => {
          setCart(response.data);
        });
    } else {
      setCart([]);
    }
  }, [isUserLoggedIn]);

  /* 從購物車中移除 */
  const delCartHandler = async (cart_id) => {
    try {
      const response = await axios.delete(
        API_URL + "/shoppingCart/api/shoppingCart_delete",
        { data: { cart_id } }
      );
      setCart(
        (prevCart) => prevCart.filter((item) => item.cart_id !== cart_id)
        /* 將不等於 cart_id 者保留，等於者移除(表示被選到要刪除的)，
        以便直接更新畫面。(filter 為 true 者會保留在新陣列。) */
      );
    } catch (err) {
      console.error("錯誤獲取 shoppingCart_delete:", err);
    }
  };

  /* 購買清單 */
  // 開啟/關閉
  const DialogHandler = () => {
    setPayForm((prev) => !prev);
  };

  /* 送出購物車表單(送出表單) */
  const submitDealHandler = async (
    product_id,
    order_date,
    total_price,
    cart_id
  ) => {
    try {
      const data = {
        user_id: userInfo.user_id,
        product_id: JSON.stringify(product_id), // 傳 JSON 格式
        order_date: order_date,
        total_price: total_price,
      };
      const response = await axios.post(
        API_URL + "/shoppingCart/api/dealComplete",
        data
      );
      alert(response.data.message);
      cart_id.forEach((id) => {
        delCartHandler(id);
      });
    } catch (err) {
      console.error("錯誤獲取 shoppingCart_insert:", err);
    }
  };

  return (
    <div className={classes.shoppingCartPage}>
      <Helmet>
        <title>TheGameC - 購物車</title>
      </Helmet>
      {payForm ? (
        <PayForm
          fetchCart={cart}
          onDialogClose={DialogHandler}
          onSumbitDeal={submitDealHandler}
          setPayForm={setPayForm}
        />
      ) : (
        ""
      )}
      <Cart
        fetchCart={cart}
        onDel={delCartHandler}
        onDialogOpen={DialogHandler}
      />
    </div>
  );
};

export default ShoppingCart;
