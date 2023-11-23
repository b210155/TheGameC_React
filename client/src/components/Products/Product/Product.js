import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL_PRODUCTS } from "../../../constants";

import ProductInfo from "./ProductInfo/ProductInfo";
import ProductFunc from "./ProductFunc/ProductFunc";

import classes from "./Product.module.css";

/* 商品單頁 */
const Product = () => {
  const { product_id } = useParams(); // 獲取網頁 Params
  const navigate = useNavigate();

  /* 獲取商品 */
  const [product, setProduct] = useState(); // 獲取商品資訊
  /* 獲取評分 */
  const [averageRating, setAverageRating] = useState(); // 獲取商品評分
  const [fetchRatingRenew, setFetchRatingRenew] = useState(false); // 更新獲取商品評分

  const [typeBg, setTypeBg] = useState(); // 設背景圖片

  /* 不同類型商品的背景 */
  const getTypeBg = (type) => {
    switch (type) {
      case "動作":
        return "action";
      case "冒險":
        return "avg";
      case "模擬":
        return "slg";
      case "策略":
        return "strategy";
      case "運動與競技":
        return "esport";
      default:
        return "";
    }
  };

  /* 獲取商品資料 */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${API_URL_PRODUCTS}/single_product_select/${product_id}`
        );
        if (response.data && response.data.length > 0) {
          setProduct(response.data[0]);
          setTypeBg(getTypeBg(response.data[0].product_type));
        } else {
          navigate("/404"); // 如果產品不存在，到404
        }
      } catch (err) {
        console.error("single_product_select 錯誤", err);
        navigate("/404"); // 發生錯誤，到404
      }
    };
    fetchProduct();
  }, [product_id, navigate]);

  /* 獲取商品評分 */
  useEffect(() => {
    const fetchProductRating = async () => {
      try {
        const response = await axios.get(
          `${API_URL_PRODUCTS}/product_reviews_rating_select/${product_id}`
        );
        setAverageRating(response.data[0].average_rating);
      } catch (err) {
        console.error("product_reviews_rating_select 錯誤", err);
      }
    };
    fetchProductRating();
  }, [product_id, navigate, fetchRatingRenew]);

  return (
    <div className={`${classes.product} ${classes[typeBg]}`}>
      <Helmet>
        <title>TheGameC - {product ? product.product_name : "商品"}</title>
      </Helmet>
      <ProductInfo fetchProduct={product} averageRating={averageRating} />
      <ProductFunc
        product_id={product_id}
        fetchProduct={product}
        renewRating={setFetchRatingRenew}
      />
    </div>
  );
};

export default Product;
