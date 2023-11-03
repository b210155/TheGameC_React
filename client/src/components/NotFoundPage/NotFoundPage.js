import React from "react";

import Image from "../UI/Image/Image";
import classes from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={classes.NotFoundPage}>
      <Image src="/images/UI/NotFound/error404.png" alt="404" />
      <span>404 Not Found</span>
      <span>很抱歉，您搜尋的頁面不存在 ...</span>
      <a href="/">點我回到首頁</a>
    </div>
  );
};

export default NotFoundPage;
