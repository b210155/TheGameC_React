import React from "react";
import { useNavigate } from "react-router-dom";

import classes from "./HomeJoin.module.css";

const HomeJoin = (props) => {
  /* 導航 */
  const navigate = useNavigate();
  const goToPage = () => {
    navigate("/login");
  };

  return (
    <div className={classes.homeJoin}>
      {/* 亮度調整 */}
      <div className={classes.bgFilter}></div>
      {/* 內文 */}
      <div className={classes.textContainer}>
        <p className={classes.title}>加入 TheGameC 一起痛快樂遊</p>
        <span className={classes.text}>
          對遊戲充滿熱情嗎? 讓 TheGameC 開啟您的遊戲之旅！成為 TheGameC
          的一員，以最實惠的價格購買遊戲。我們會提供您最優質的服務，讓您體驗賓至如歸的享受。加入TheGameC
          大家庭，探索遊戲的無限可能！
        </span>
        <button onClick={goToPage}>加入</button>
      </div>
    </div>
  );
};

export default HomeJoin;
