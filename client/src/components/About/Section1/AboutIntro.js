import React from "react";

import AboutIntroInfo from "./AboutIntroInfo";

import classes from "./AboutIntro.module.css";

const AboutIntro = () => {
  return (
    <div className={classes.aboutIntro}>
      {/* 亮度調整 */}
      <div className={classes.bgFilter}></div>
      {/* 左邊區塊：介紹 */}
      <AboutIntroInfo />
    </div>
  );
};

export default AboutIntro;
