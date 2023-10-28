/* 建立 Redux store */
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import productsReducer from "./productsSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    products: productsReducer,
  },
});

export default store;
