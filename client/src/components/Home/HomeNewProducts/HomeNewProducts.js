import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Arrow_next from "../../UI/Arrow/Arrow_next";
import Arrow_prev from "../../UI/Arrow/Arrow_prev";

import HomeNewPitem from "./HomeNewPitem";

import classes from "./HomeNewProducts.module.css";

const HomeNewProducts = (props) => {
  const [products, setProducts] = useState([]);

  /* 獲取熱門商品 */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/products/api/product_new_select`
        );
        setProducts(response.data);
      } catch (err) {
        console.error("錯誤獲取 product_new_select:", err);
      }
    };
    fetchProducts();
  }, []);

  /* 到商店頁 */
  const navigate = useNavigate();
  const toPage = () => {
    navigate(`/products`);
  };

  /* 輪播圖 */
  const carouselSettings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 6,
    nextArrow: <Arrow_next />,
    prevArrow: <Arrow_prev />,
    responsive: [
      {
        breakpoint: 1270,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 1068,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 880,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
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
        breakpoint: 475,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <React.Fragment>
      <div className={classes.homeNewProducts}>
        <span className={classes.title}>最新商品</span>
        <div className={classes.productsContainer}>
          {products.length > 0 ? (
            <Slider {...carouselSettings} className={classes.fullWidthSlider}>
              {products.map((product, index) => (
                <HomeNewPitem key={index} fetchProduct={product} />
              ))}
            </Slider>
          ) : null}
        </div>
        <span className={classes.goToBtn} onClick={toPage}>
          查看所有商品
        </span>
      </div>
    </React.Fragment>
  );
};

export default HomeNewProducts;
