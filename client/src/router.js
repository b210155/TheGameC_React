import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import About from "./components/About/About";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import ProductsPage from "./components/Products/ProductsPage";
import LoginPage from "./components/Login/LoginPage";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import User from "./components/User/User";
import Product from "./components/Products/Product/Product";
import Service from "./components/Service/Service";

const AppRouter = () => {
  return (
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
  );
};

export default AppRouter;
