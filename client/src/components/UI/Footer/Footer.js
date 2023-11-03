import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Image from "../Image/Image";
import classes from "./Footer.module.css";

const Footer = () => {
  /* 該頁面 footer 是否顯示 */
  const location = useLocation(); // 獲得當前路徑
  const [showFooter, setShowFooter] = useState(true); // 顯示 footer
  const dontShow = ["/login", "/shoppingCart", "/user"]; // 那些路由不顯示 footer
  const footer_black = ["/"]; // 哪些路由使用黑色 footer

  useEffect(() => {
    setShowFooter(!dontShow.includes(location.pathname));
  }, [location.pathname]);

  return (
    <React.Fragment>
      {showFooter ? (
        <div
          className={`${classes.footer} ${
            footer_black.includes(location.pathname)
              ? classes.BgColorBlack
              : null
          }`}
        >
          {/* 左邊：資訊 */}
          <div className={classes.info}>
            <Image src="/images/UI/Nav/logo_text.svg" alt="logo" />
            <div className={classes.intro}>
              <p>TheGameC 遊戲購買平台 | TheGameC 公司</p>
              <p>信箱：TheGameCforTest123@gmail.com</p>
              <p>客服專線：00-0000-0000</p>
            </div>
          </div>
          {/* 右邊：連結 */}
          <div className={classes.link}>
            <div>
              <Image src="/images/UI/Footer/fb.svg" alt="FB logo" />
            </div>
            <div>
              <Image src="/images/UI/Footer/ig.svg" alt="IG logo" />
            </div>
            <div>
              <Image src="/images/UI/Footer/twitter.svg" alt="Twitter logo" />
            </div>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default Footer;
