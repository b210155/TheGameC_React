import React from "react";

const Image = ({ src, alt, ...props }) => (
  <img src={process.env.PUBLIC_URL + src} alt={alt} {...props} />
);

export default Image;

// 用於非來自 API 的圖片，client 本身的圖片
// 當不部屬在 github pgaes 後可以直接刪除 process.env.PUBLIC_URL
