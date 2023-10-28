import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/* 設定進入頁面從頁頂開始 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
