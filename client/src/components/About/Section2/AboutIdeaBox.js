import React from "react";

import classes from "./AboutIdeaBox.module.css";

const AboutIdeaBox = ({ data }) => {
  return (
    <div className={classes.aboutIdeaBox}>
      <div className={classes.textContainer}>
        {/* 標題 */}
        <div className={classes.titleBox}>
          <span className={classes.title}>{data.name}</span>
        </div>
        {/* 內文 */}
        <div className={classes.contentBox}>
          <span className={classes.content}>{data.content}</span>
        </div>
      </div>
      {/* 背景圖 */}
      <div className={classes.mask_black}></div>
      <img src={`/images/UI/About/${data.image}`} alt="理念圖" />
    </div>
  );
};

export default AboutIdeaBox;
