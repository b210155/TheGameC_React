import React, { useState, useEffect } from "react";
import { debounce } from "lodash"; // 防抖：一段時間過去之後才執行函數

import classes from "./SearchForm.module.css";

const SearchForm = (props) => {
  /* input 值狀態 */
  const [inputValue, setInputValue] = useState("");

  /* 建議狀態(模糊搜尋) */
  const [suggestions, setSuggestions] = useState([]); // 建議內容
  const [suggestOpen, setSuggestOpen] = useState(false); // 建議開關

  /* 防抖函數 */
  const debounceInputHandler = debounce((value) => {
    /* 將原本的 onChange 處理器函數內容改放入防抖函數內 */
    // 過濾出名稱含有輸入內容的商品
    let result = props.fetchProducts.filter((item) =>
      item.product_name.includes(value)
    );

    // 傳送結果到 Search 更新 UI
    // props.onBurry(result);

    // 建議內容設置
    if (result.length === props.fetchProducts.length) return setSuggestions([]);
    setSuggestions(result);
    setSuggestOpen(true);
  }, 300); // 設定停下後多久觸發

  /* input輸入處理器 */
  // 用於觸發防抖函數和給參數值(如防抖的 value 這裡給事件 e)
  const inputChangeHandler = (e) => {
    debounceInputHandler(e.target.value);
    setInputValue(e.target.value);
  };

  /* 選擇建議處理器 */
  const suggestSelectHandler = (e) => {
    setInputValue(e.target.innerText);
    setSuggestOpen(false);
  };

  /* 送出結果 */
  const submitFormHandler = (e) => {
    e.preventDefault();
    props.onFetch(e.target.product_name.value);
    setSuggestOpen(false);
  };

  /* 點擊任意地方，關閉建議 */
  useEffect(() => {
    const clickCloseSuggestHandler = () => {
      setSuggestOpen(false);
    };
    // 添加事件監聽器
    window.addEventListener("click", clickCloseSuggestHandler);
    // 在組件卸載時移除事件監聽器
    return () => {
      window.removeEventListener("click", clickCloseSuggestHandler);
    };
  }, []);

  return (
    <form className={classes.searchForm} onSubmit={submitFormHandler}>
      <img
        className={classes.searchImg}
        src="/images/UI/Nav/search.svg"
        alt="搜索"
      />
      <div className={classes.inputContainer}>
        <input
          type="text"
          name="product_name"
          onChange={inputChangeHandler}
          value={inputValue}
        />
        {suggestOpen && suggestions.length > 0 && (
          <ul className={classes.suggestions}>
            {suggestions.map((suggestion) => (
              <li key={suggestion.product_name} onClick={suggestSelectHandler}>
                {suggestion.product_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button className={classes.submitBtn} type="submit">
        搜尋
      </button>
    </form>
  );
};

export default SearchForm;
