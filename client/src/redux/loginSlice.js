/* 創建各種狀態邏輯 */
import { createSlice } from "@reduxjs/toolkit";
import { IS_LOGGED_IN_KEY } from "../constants";

/* 定義初始狀態 */
const initialState = {
  isUserLoggedIn: false,
  userInfo: null,
};

/* 創建一個 slice */
// 其中包括了初始狀態、一組 reducer 函數，以及相對應的 action creators。
const loginSlice = createSlice({
  name: "LOGIN",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isUserLoggedIn = true; // 登入狀態
      state.userInfo = action.payload; // 獲取傳遞的數據，這是Redux Toolkit約定的標準方式(獲取的是用戶資料)
      sessionStorage.setItem(IS_LOGGED_IN_KEY, "1"); // 儲存登入至session
    },
    logout: (state) => {
      state.isUserLoggedIn = false;
      state.userInfo = null;
      sessionStorage.removeItem(IS_LOGGED_IN_KEY);
    },

    // 更改用戶資料
    updateUserInfo: (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
  },
});

// reducers對象中定義的函數（login、logout）會有一個對應的 action creator。
// 這些 action creator 被放在返回的 slice 對象的 actions 屬性中。
export const { login, logout, updateUserInfo } = loginSlice.actions;

export default loginSlice.reducer;
