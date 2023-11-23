import React, { useState, useEffect } from "react";

import classes from "./ProductTypes.module.css";

const ProductTypes = (props) => {
  const [allTypes, setAllTypes] = useState([]); // 所有分類
  const [selectedType, setSelectedType] = useState("所有商品"); // 選擇的分類

  /* 列出所有分類 */
  useEffect(() => {
    const types = ["所有商品"]; // 陣列蒐集分類 (加入api中沒有的分類 "所有商品")
    props.dataFetch.forEach((product) => {
      // 重複的分類不重複加入陣列
      if (!types.includes(product.product_type)) {
        types.push(product.product_type);
      }
    });
    setAllTypes(types);
  }, [props.dataFetch]);

  /* 選擇類型 handler */
  const productTypeHandler = (e) => {
    // 被點選者套用 css
    setSelectedType(() => e.target.textContent);
    props.onGetType(e.target.textContent); // 傳遞被選擇的類型至父
  };

  return (
    <React.Fragment>
      <div className={classes.productTypes}>
        <ul>
          {allTypes.map((typeName) => (
            <li
              key={typeName}
              className={typeName === selectedType ? classes.clicked : ""}
              onClick={productTypeHandler}
            >
              {typeName}
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default ProductTypes;
