import React from "react";

import classes from "./AboutJoinSelect.module.css";

const AboutJoinSelect = ({ data }) => {
  return (
    <div className={classes.aboutJoinSelect}>
      <span className={classes.title}>{data.name}</span>
      <div className={classes.contentBox}>{data.content}</div>
    </div>
  );
};

export default AboutJoinSelect;
