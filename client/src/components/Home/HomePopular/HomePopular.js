import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../constants";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import "../slick.css";
// import "../slick-theme.css";

import HomePopularProduct from "./HomePopularProduct";
import HomePopularImg from "./HomePopularImg";

import classes from "./HomePopular.module.css";

const HomePopular = () => {
  const [products, setProducts] = useState([]); // 所有熱門商品
  const [selectProduct, setSelectProduct] = useState(); // 選擇的商品

  /* 獲取熱門商品 */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/products/api/product_hot_select`
        );
        setProducts(response.data);
        setSelectProduct(response.data[0]);
      } catch (err) {
        console.error("錯誤獲取 product_hot_select:", err);
      }
    };
    fetchProducts();
  }, []);

  /* 輪播圖 */
  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1020,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 790,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 670,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 510,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  /* 選擇商品 */
  const selectProductHandler = (product) => {
    setSelectProduct(product);
  };

  return (
    <div className={classes.homePopular}>
      {/* 背景 */}
      {selectProduct ? (
        <img
          className={classes.backgroundImg}
          src={`${API_URL}/static/images/products/${selectProduct.image}`}
          alt="背景"
        />
      ) : null}
      {/* 大圖 */}
      <div className={classes.bigImgContainer}>
        {selectProduct ? (
          <HomePopularImg selectProduct={selectProduct} />
        ) : null}
      </div>
      {/* 商品 */}
      <div className={classes.productsContainer}>
        {products.length > 0 ? (
          <Slider {...carouselSettings} className={classes.fullWidthSlider}>
            {products.map((product, index) => (
              <HomePopularProduct
                key={index}
                fetchProduct={product}
                selectProduct={selectProduct}
                onSelect={selectProductHandler}
              />
            ))}
          </Slider>
        ) : null}
      </div>
    </div>
  );
};

export default HomePopular;
