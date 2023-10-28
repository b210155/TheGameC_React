import axios from "axios";
import { API_URL } from "../constants";

/* 創建各種狀態邏輯 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(
      "http://localhost:5000/products/api/products_select"
    );
    const products = response.data; /* 所有商品 */
    const types = []; /* 所有分類 */
    products.forEach((product) => {
      // 重複的分類不重複加入陣列
      if (!types.includes(product.product_type)) {
        types.push(product.product_type);
      }
    });
    return { products, types };
  }
);

/* 定義初始狀態 */
const initialState = {
  products: [],
  products_types: [],
};

/* 創建一個 slice */
// 其中包括了初始狀態、一組 reducer 函數，以及相對應的 action creators。
const productsSlice = createSlice({
  name: "PRODUCTS",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.products_types = action.payload.types;
    });
  },
});

export default productsSlice.reducer;
