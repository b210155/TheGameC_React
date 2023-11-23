import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import { API_URL } from "./constants";

import { login, logout } from "./redux/loginSlice";

import Home from "./components/Home/Home";
import About from "./components/About/About";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import ProductsPage from "./components/Products/ProductsPage";
import NavUsing from "./components/UI/Nav/NavUsing";
import LoginPage from "./components/Login/LoginPage";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import User from "./components/User/User";
import Product from "./components/Products/Product/Product";
import Service from "./components/Service/Service";
import Footer from "./components/UI/Footer/Footer";

import ScrollToTop from "./components/UI/ScrollToTop"; // 從頁頂開始

const App = () => {
  const dispatch = useDispatch();

  /* 登入時，調用登入api */
  // 調用 cookie username，獲取 user 的資料
  useEffect(() => {
    const fetchtUserData = async () => {
      let getUsername = Cookies.get("username");
      if (getUsername) {
        try {
          getUsername = JSON.parse(decodeURIComponent(getUsername));
          const response = await axios.post(API_URL + "/login/getUserInfo", {
            username: getUsername,
          });
          dispatch(login(response.data));
        } catch (err) {}
      } else {
        dispatch(logout());
      }
    };
    fetchtUserData();
  }, [dispatch]);

  return (
    <Router>
      <Helmet>
        <title>TheGameC | 遊戲購買平台</title>
      </Helmet>
      <div>
        <NavUsing />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:product_id" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/shoppingCart" element={<ShoppingCart />} />
          <Route path="/user" element={<User />} />
          <Route path="/service" element={<Service />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
