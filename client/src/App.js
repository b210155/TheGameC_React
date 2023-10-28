import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";

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

import TransitionPage from "./components/UI/TransitionPage";

const App = () => {
  const dispatch = useDispatch();
  /* 登入狀態 */
  const isUserLoggedIn = useSelector((state) => state.login.isUserLoggedIn);
  const userInfo = useSelector((state) => state.login.userInfo);

  /* 調用登入api */
  // useEffect(() => {
  //   axios
  //     .get(API_URL + "/login/check-session", { withCredentials: true })
  //     .then((response) => {
  //       if (response.data.message === "用戶已登入") {
  //         dispatch(login(response.data.user));
  //       } else {
  //         dispatch(logout());
  //       }
  //     });
  // }, [dispatch]);

  /* 調用登入api，以cookie */
  useEffect(() => {
    let getUserInfo = Cookies.get("userInfo");
    if (getUserInfo) {
      getUserInfo = JSON.parse(decodeURIComponent(getUserInfo));
      dispatch(login(getUserInfo));
    } else {
      dispatch(logout());
    }
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
        {/* <TransitionPage /> */}
      </div>
    </Router>
  );
};

export default App;
