import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../../../../constants";

import classes from "./ProductInfo.module.css";

const ProductInfo = (props) => {
  /* 用戶狀態 */
  const isUserLoggedIn = useSelector((state) => state.login.isUserLoggedIn);
  const userInfo = useSelector((state) => state.login.userInfo);

  const [pInCart, setPInCart] = useState(false); // 購物車是否有此商品
  const [pInOrder, setPInOrder] = useState(false); // 訂單是否有此商品

  /* 先驗證有沒有收到資料(資料傳輸需要時間) */
  // 確認有資料(fetch)後
  const dataOrLoading = (fetch, dataAccessor) =>
    fetch ? dataAccessor(fetch) : "Loading...";

  /* 查看購物車是否已存在商品 */
  useEffect(() => {
    if (props.fetchProduct && isUserLoggedIn && userInfo) {
      const fetchCart = async () => {
        try {
          const response = await axios.get(
            `${API_URL}/shoppingCart/api/single_shoppingCart_select?product_id=${props.fetchProduct.product_id}&user_id=${userInfo.user_id}`
          );
          if (response.data[0]) {
            setPInCart(
              response.data[0].product_id === props.fetchProduct.product_id
            ); // 商品是否存在購物車
          } else {
            setPInCart(false);
          }
        } catch (err) {
          console.error("single_shoppingCart_select 錯誤", err);
        }
      };
      fetchCart();
    } else {
      setPInOrder(false);
    }
  }, [props.fetchProduct, userInfo, isUserLoggedIn]);

  /* 查看商品是否已存在訂單 */
  useEffect(() => {
    if (props.fetchProduct && isUserLoggedIn && userInfo) {
      const fetchOrder = async () => {
        try {
          await axios
            .get(
              `${API_URL}/products/api/orders_select?user_id=${userInfo.user_id}`
            )
            .then((response) => {
              if (response.data.length <= 0) return;
              // 使用 reduce() 和 concat() 來合併多個陣列
              const inOrderPID = response.data.reduce((acc, curr) => {
                return acc.concat(JSON.parse(curr.product_id));
                // JSON.parse() ("[...]" -> [...])
                // 加到累積器 acc 中
              }, []); // 設定 [] 為 acc 初始值
              setPInOrder(inOrderPID.includes(props.fetchProduct.product_id)); // 商品是否存在於購買清單
            });
        } catch (err) {
          console.error("錯誤獲取 order_select:", err);
        }
      };
      fetchOrder();
    } else {
      setPInOrder(false);
    }
  }, [props.fetchProduct, userInfo, isUserLoggedIn]);

  /* 加入購物車 */
  const productToCartHandler = async () => {
    if (props.fetchProduct && isUserLoggedIn && userInfo) {
      if (userInfo.current_age >= parseInt(props.fetchProduct.age_rating)) {
        try {
          const response = await axios.post(
            API_URL + "/shoppingCart/api/shoppingCart_insert",
            {
              user_id: userInfo.user_id,
              product_id: props.fetchProduct.product_id,
              price: props.fetchProduct.price,
            }
          );
          alert(response.data.message);
          setPInCart(true);
        } catch (err) {
          console.error("錯誤獲取 shoppingCart_insert:", err);
        }
      } else {
        alert(
          `此商品為${props.fetchProduct.age_rating}+，您目前的年齡尚無法獲取此商品。`
        );
      }
    } else {
      alert("加入購物車發生錯誤，請稍等一下再試。");
    }
  };

  return (
    <div className={classes.productInfo}>
      {/* 商品圖 */}
      <div className={classes.imgContainer}>
        <img
          src={dataOrLoading(
            props.fetchProduct,
            (fetch) => API_URL + "/static/images/products/" + fetch.image
          )}
          alt="商品圖片"
        />
      </div>
      {/* 商品內容 */}
      <div className={classes.infoContainer}>
        {/* 商品標題 */}
        <div className={classes.title}>
          <span>
            {dataOrLoading(props.fetchProduct, (fetch) => fetch.product_name)}
          </span>
        </div>
        {/* 商品內文 */}
        <div className={classes.info}>
          {/* 商品類別 */}
          <span className={classes.type}>
            {dataOrLoading(props.fetchProduct, (fetch) => fetch.product_type)}
          </span>
          {/* 商品介紹 */}
          <span className={classes.description}>
            {dataOrLoading(props.fetchProduct, (fetch) => fetch.description)}
          </span>
          {/* 商品細節：開發、營運、年齡、評分、購買人數 */}
          <div className={classes.detail}>
            <span>
              開發商：
              {dataOrLoading(props.fetchProduct, (fetch) => fetch.developer)}
            </span>
            <span>
              營運商：
              {dataOrLoading(props.fetchProduct, (fetch) => fetch.publisher)}
            </span>
            <span>
              年齡限制：
              {dataOrLoading(
                props.fetchProduct,
                (fetch) => fetch.age_rating
              )}{" "}
              歲以上
            </span>
            <span>評分：{props.averageRating || "尚無評分"}</span>
            <span>
              購買人數：
              {dataOrLoading(props.fetchProduct, (fetch) => fetch.buy_count)}
            </span>
          </div>
          {/* 商品價格 */}
          <span className={classes.cost}>
            價格：NT${" "}
            {dataOrLoading(props.fetchProduct, (fetch) => fetch.price)}
          </span>
          {/* 購物車按鈕 */}
          {isUserLoggedIn && props.fetchProduct ? (
            pInOrder ? (
              <span className={classes.notAllowCartBtn}>您已經擁有此商品</span>
            ) : pInCart ? (
              <span className={classes.notAllowCartBtn}>
                此商品已經放入購物車
              </span>
            ) : (
              <button
                className={classes.cartBtn}
                onClick={productToCartHandler}
              >
                加入購物車
              </button>
            )
          ) : (
            <span className={classes.notAllowCartBtn}>
              登入後才可以使用購物車
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
