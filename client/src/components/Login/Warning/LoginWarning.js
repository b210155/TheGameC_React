import React from "react";

import Dialog from "../../UI/Dialog";

import classes from "./LoginWarning.module.css";

const LoginWarning = (props) => {
  return (
    <Dialog onDialogClose={props.onDialogClose}>
      <div className={classes.LoginWarning}>{props.warning}</div>
    </Dialog>
  );
};

export default LoginWarning;
