import React from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "../Home/Home";
import About from "../About/About";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import ProductsPage from "../Products/ProductsPage";
import LoginPage from "../Login/LoginPage";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import User from "../User/User";
import Product from "../Products/Product/Product";
import Nav from "./Nav/Nav";

import "./TransitionPage.css";

const TransitionPage = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/product/:product_id" element={<Product />} />
      <Route path="/about" element={<About />} />
      <Route path="/shoppingCart" element={<ShoppingCart />} />
      <Route path="/User" element={<User />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default TransitionPage;
