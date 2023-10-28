import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Nav from "./Nav";
import Nav2 from "./Nav2";
import Sidebar from "./Sidebar";

const NavUsing = () => {
  /* 顯示哪個 Nav 狀態 */
  const [showNav, setShowNav] = useState(<Nav />);
  const location = useLocation(); // 獲取當前路徑
  const NavUsing2 = ["/"]; // 使用 Nav2 的路由放這裡
  useEffect(() => {
    if (NavUsing2.includes(location.pathname)) {
      setShowNav(<Nav2 />);
    } else {
      setShowNav(<Nav />);
    }
  }, [location.pathname]);

  /* 螢幕寬度響應 */
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <React.Fragment>{windowWidth < 875 ? <Sidebar /> : showNav}</React.Fragment>
  );
};

export default NavUsing;
