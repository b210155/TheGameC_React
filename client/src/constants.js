/* 登入 */
export const IS_LOGGED_IN_KEY = "IS_LOGGED_IN"; // 登入常數

/* client URL */
export const URL = process.env.REACT_APP_URL; // 前端 URL

/* API URL */
export const API_URL = process.env.REACT_APP_API_URL; // 後端 URL
export const API_URL_PRODUCTS = `${API_URL}/products/api`; // 後端 商品 API
export const API_URL_CARTS = `${API_URL}/shoppingCart/api`; // 後端 購物車 API
export const API_URL_LOGIN = `${API_URL}/login`; // 後端 登入 API
export const API_URL_USER = `${API_URL}//user/api`; // 後端 用戶 API
export const API_URL_SERVICE = `${API_URL}/service/api`; // 後端 客服表單 API
