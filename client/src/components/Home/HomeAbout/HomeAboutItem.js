import React from "react";

import classes from "./HomeAboutItem.module.css";

const HomeAboutItem = (props) => {
  return (
    <div className={classes.homeAboutItem}>
      <img src={`/images/UI/Home/${props.data.image}`} />
      <span className={classes.text}>{props.data.text}</span>
    </div>
  );
};

export default HomeAboutItem;
