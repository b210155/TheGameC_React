import React, { useState, useEffect } from "react";
import PItem from "./PItem";
import Pagination from "../UI/Pagination";
import classes from "./ProductItems.module.css";

const ProductItems = (props) => {
  const [typeProducts, setTypeProducts] = useState([]); // 符合該類型的商品
  const [itemInCart, setItemInCart] = useState([]); // 購物車

  /* 分類型 */
  // 使用 Effect 來對商品做過濾，將過濾結果傳給狀態
  useEffect(() => {
    // 獲取篩選完的新陣列：所有商品 & 該類型商品
    let filteredProducts =
      props.selectProductType === "所有商品"
        ? props.dataFetch
        : props.dataFetch.filter((productItem) => {
            return productItem.product_type === props.selectProductType;
          });
    setTypeProducts(filteredProducts); // 狀態改為新陣列
  }, [props.dataFetch, props.selectProductType]); // 除了初次外，只有選擇的類型改變或商品表有被改動時才啟動

  /* 分頁設定 */
  const [pageLimit, setPageLimit] = useState(6); // 每頁幾個
  const [showItems, setShowItems] = useState([]); // 顯示的內容
  // 獲取顯示內容(從 Pagination 元件)
  const pageItemsHandler = (items) => {
    setShowItems(items);
  };
  // 螢幕小於多少一頁就只顯示3個
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    if (windowWidth < 750) {
      setPageLimit(3);
    } else {
      setPageLimit(6);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  return (
    <div className={classes.productItems}>
      <div className={classes.ItemsContainer}>
        {showItems.map((item) => {
          return (
            <PItem
              key={"product_ID" + item.product_id}
              item={item}
              itemInCart={itemInCart}
              setItemInCart={setItemInCart}
              onAddtoCart={props.onAddtoCart}
              dataFetchCart={props.dataFetchCart}
              dataFetchOrder={props.dataFetchOrder}
            />
          );
        })}
      </div>
      <Pagination
        items={typeProducts}
        pageLimit={pageLimit}
        onGetPageItems={pageItemsHandler}
        resetPage={props.selectProductType}
        /* 觸發更換類型時，重製頁面至第一頁 */
      />
    </div>
  );
};

export default ProductItems;
