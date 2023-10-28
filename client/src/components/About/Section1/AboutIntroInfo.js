import React from "react";

import classes from "./AboutIntroInfo.module.css";

const AboutIntroInfo = () => {
  return (
    <div className={classes.aboutIntroInfo}>
      <span className={classes.title}>關於 TheGameC</span>
      <span className={classes.text}>
        TheGameC是一個遊戲購買平台，為遊戲愛好者提供安全、便捷、有趣的購買環境。我們的目標是通過高質量的商品和良好的服務，創建用戶與官方間可互相信賴的平台，使每位用戶都能享受無與倫比的遊戲體驗。
      </span>
      <span className={classes.textFaded}>
        TheGameC is a game purchasing platform that offers a safe, convenient,
        and enjoyable buying environment for gaming enthusiasts.
      </span>
    </div>
  );
};

export default AboutIntroInfo;
