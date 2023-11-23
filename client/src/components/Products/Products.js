import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../../constants";

import ProductTypes from "./ProductTypes";
import ProductItems from "./ProductItems";
import classes from "./Products.module.css";

const Products = () => {
  /* 登入狀態 */
  const isUserLoggedIn = useSelector((state) => state.login.isUserLoggedIn);
  const userInfo = useSelector((state) => state.login.userInfo);

  const [products, setProducts] = useState([]); // 所有商品
  const [productType, setProductType] = useState("所有商品"); // 商品類型 (預設為所有)
  const [pInCart, setPInCart] = useState([]); // 購物車內的商品 (product_id)
  const [pInOrder, setPInOrder] = useState([]); // 商品已在購買訂單(已被購買)

  /* 使用 Effect 獲取商品資料表 */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          API_URL + "/products/api/products_select"
        );
        setProducts(response.data);
      } catch (err) {
        console.error("錯誤獲取 products_select:", err);
      }
    };
    fetchProducts();
  }, []);

  /* 選擇類型 */
  const selectedTypeHandler = (selectedType) => {
    setProductType(() => selectedType);
  };

  /* 加入購物車 */
  const productToCartHandler = async (product_id, price, age_rating) => {
    // 年齡限制
    if (userInfo.current_age >= parseInt(age_rating)) {
      try {
        const response = await axios.post(
          API_URL + "/shoppingCart/api/shoppingCart_insert",
          { user_id: userInfo.user_id, product_id, price }
        );
        alert(response.data.message);
        setPInCart((prevState) => [...prevState, product_id]);
      } catch (err) {
        console.error("錯誤獲取 shoppingCart_insert:", err);
      }
    } else {
      alert(`此商品為${age_rating}+，您目前的年齡尚無法獲取此商品。`);
    }
  };

  /* 購物車內的商品 (提取 product_id，來做 PItem 的購物車按鈕判斷) */
  useEffect(() => {
    if (isUserLoggedIn) {
      const fetchCart = async () => {
        try {
          await axios
            .get(
              `${API_URL}/shoppingCart/api/shoppingCart_select?user_id=${userInfo.user_id}`
            )
            .then((response) => {
              const inCartPID = response.data.map(
                (cartItem) => cartItem.product_id
              );
              setPInCart(inCartPID);
            });
        } catch (err) {
          console.error("錯誤獲取 shoppingCart_select:", err);
        }
      };
      fetchCart();
    } else {
      setPInCart([]);
    }
  }, [isUserLoggedIn]); // 登入後才撈資料

  /* 已購買的商品 */
  useEffect(() => {
    if (isUserLoggedIn) {
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
                // JSON.parse()可將字串轉成陣列 ("[...]" -> [...])
                // product_id 加到累積器 acc 中
              }, []); // 設定 [] 為 acc 初始值
              setPInOrder(inOrderPID);
            });
        } catch (err) {
          console.error("錯誤獲取 order_select:", err);
        }
      };
      fetchOrder();
    } else {
      setPInOrder([]);
    }
  }, [isUserLoggedIn]);

  return (
    <div className={classes.productsPage}>
      <ProductTypes dataFetch={products} onGetType={selectedTypeHandler} />
      <ProductItems
        dataFetch={products}
        selectProductType={productType}
        onAddtoCart={productToCartHandler}
        dataFetchCart={pInCart}
        dataFetchOrder={pInOrder}
      />
    </div>
  );
};

export default Products;
