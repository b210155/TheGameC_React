import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../../constants";

import classes from "./ProductRecommend.module.css";

const ProductRecommend = (props) => {
  const [products, setProducts] = useState([]); // 選擇的商品(3個)

  const navigate = useNavigate();

  const toPage = (location) => {
    navigate("/product/" + location);
  };

  /* 選擇商品函數 */
  useEffect(() => {
    if (props.fetchProduct) {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(
            `${API_URL}/products/api/product_type_select?product_type=${props.fetchProduct.product_type}`
          );
          setProducts(response.data);
        } catch (err) {
          console.error("product_type_select 錯誤", err);
        }
      };
      fetchProducts();
    }
  }, [props.product_id, props.selectFunc]);

  return (
    <div className={classes.productRecommend}>
      <div className={classes.productContainer}>
        <span className={classes.title}>也許您也會喜歡</span>
        {products.map((product) => (
          <div
            className={classes.product}
            key={product.product_id}
            onClick={() => toPage(product.product_id)}
          >
            <div className={classes.imgContainer}>
              <img src={`${API_URL}/static/images/products/${product.image}`} />
            </div>
            <div className={classes.info}>
              <h2>{product.product_name}</h2>
              <div className={classes.descriptionContainer}>
                <span>{product.description}</span>
              </div>
            </div>
            {/* <button>前往網頁</button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductRecommend;
