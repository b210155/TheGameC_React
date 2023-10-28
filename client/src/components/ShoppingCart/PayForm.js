import React, { useState, useEffect } from "react";
// import axios from "axios";

import Dialog from "../UI/Dialog";
import classes from "./PayForm.module.css";

const PayForm = (props) => {
  // 選擇購買的商品(購物車中)
  const [chosen, setChosen] = useState(props.fetchCart);
  // 信用卡狀態
  const [credit, setCredit] = useState({
    cardholder: "",
    cardnumber: "",
    expdate: "",
    cvv: "",
  });
  // 信用卡正規表達式驗證
  const [inputValid, setInputValid] = useState({
    cardnumber: false,
    expdate: false,
    cvv: false,
  });

  /* 切換商品 */
  const choseProductHandler = (e) => {
    const pName = e.target.value;
    if (pName === "全部購買") {
      setChosen(props.fetchCart);
    } else {
      const selected = props.fetchCart.filter(
        (product) => product.product_name === pName
      );
      setChosen(selected);
    }
  };

  /* 當前商品 (ID) */
  // reduce() 可將arr中選定範圍內的數加總
  const chosenProduct = chosen.map((product) => product.product_id);

  /* 當前價格 */
  // reduce() 可將arr中選定範圍內的數加總
  const chosenPrice = chosen.reduce(
    (sum, product) => sum + parseInt(product.price),
    0
  );

  /* 信用卡 ipnut 值 + 正規驗證 */
  let regex; // 正規表達式驗證
  const inputChangeHandler = (e) => {
    const { name, value, pattern } = e.target;
    // 設 credit 值
    setCredit((prev) => ({ ...prev, [name]: value }));
    // 設正規驗證狀態
    if (pattern) {
      regex = new RegExp(pattern);
      setInputValid((prev) => ({ ...prev, [name]: regex.test(value) }));
    }
  };

  /* 送出購物車表單(確認購買) */
  const buyProductHandler = (e) => {
    e.preventDefault();
    // 正規表達式驗證是否全通過
    if (Object.values(inputValid).some((v) => !v))
      return alert("請檢查您輸入的格式是否符合規定");

    // 設定日期
    if (chosenProduct.length > 0) {
      let cart_id = [];
      let currentDate = new Date();
      let formattedDate =
        currentDate.getFullYear() +
        "-" +
        String(currentDate.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(currentDate.getDate()).padStart(2, "0");
      if (chosenProduct.length == 1) {
        // 找要刪除的購物車，find()尋找匹配條件的第一個元素，返回布林
        const productID = props.fetchCart.find(
          (product) => product.product_id == chosenProduct
        );
        cart_id = productID ? [productID.cart_id] : undefined;
      } else {
        cart_id = chosen.map((product) => product.cart_id);
      }
      props.onSumbitDeal(chosenProduct, formattedDate, chosenPrice, cart_id);
    } else {
      alert("購物車內目前沒有商品。");
    }
    props.setPayForm(false);
  };

  return (
    <Dialog onDialogClose={props.onDialogClose}>
      <form className={classes.payForm} onSubmit={buyProductHandler}>
        <h2>確認購買內容</h2>
        {/* 選擇商品 */}
        <div className={classes.payInfo}>
          <span>選擇商品</span>
          <select onChange={choseProductHandler}>
            <option>全部購買</option>
            {props.fetchCart.map((pItem) => (
              <option key={`cart_${pItem.product_name}`}>
                {pItem.product_name}
              </option>
            ))}
          </select>
        </div>
        {/* 價格 */}
        <div className={classes.payInfo}>
          <span>價格</span>
          <span className={classes.cost}>NT$ {chosenPrice}</span>
        </div>
        {/* 信用卡 */}
        <div className={classes.creditCard}>
          <label>持卡人姓名</label>
          <input
            type="text"
            name="cardholder"
            onChange={inputChangeHandler}
            required
          />
          <label>信用卡卡號</label>
          <input
            type="text"
            name="cardnumber"
            pattern="\d{13,16}"
            onChange={inputChangeHandler}
            required
          />
          <label>有效日期</label>
          <input
            type="text"
            name="expdate"
            pattern="(0[1-9]|1[0-2])\/?((0[0-9])|[1-9][0-9])"
            onChange={inputChangeHandler}
            required
          />
          <label>安全碼</label>
          <input
            type="text"
            name="cvv"
            pattern="\d{3,4}"
            onChange={inputChangeHandler}
            required
          />
        </div>
        <button type="submit">確認購買</button>
      </form>
    </Dialog>
  );
};

export default PayForm;
