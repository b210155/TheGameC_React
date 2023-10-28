import React from "react";
import { Helmet } from "react-helmet";
import Products from "./Products";
import ProductsTypeIntro from "./ProductsTypeIntro";

import classes from "./ProductsPage.module.css";

const ProductsPage = () => {
  return (
    <div className={classes.productsPage}>
      <Helmet>
        <title>TheGameC - 商品頁</title>
      </Helmet>
      <ProductsTypeIntro />
      <Products />
    </div>
  );
};

export default ProductsPage;
