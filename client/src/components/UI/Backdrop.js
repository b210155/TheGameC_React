import React from "react";

import classes from "./Backdrop.module.css";

const Backdrop = (props) => {
  return (
    <div
      className={classes.backdrop}
      onClick={props.onDialogClose || null}
      title={props.title || null}
    ></div>
  );
};

export default Backdrop;
