import React from "react";
import { useNavigate } from "react-router-dom";

import SearchItem from "./SearchItem";
import classes from "./SearchResult.module.css";

const SearchResult = (props) => {
  const navigate = useNavigate();

  const toPage = (location) => {
    navigate(`/product/${location}`);
    props.setSearchState(false);
  };

  return (
    <div className={classes.searchResult}>
      {props.items.length > 0 ? (
        props.items.map((item) => (
          <SearchItem
            key={"product" + item.product_id}
            item={item}
            onNavigate={() => toPage(item.product_id)}
          />
        ))
      ) : (
        <span className={classes.searchNotFound}>查無相關商品</span>
      )}
    </div>
  );
};

export default SearchResult;
