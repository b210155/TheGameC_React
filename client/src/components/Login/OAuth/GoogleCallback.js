import React from "react";
import { API_URL_LOGIN } from "../../../constants";

import classes from "./GoogleCallback.module.css";

const GoogleCallback = () => {
  return (
    <form
      action={`${API_URL_LOGIN}/google/login`}
      method="POST"
      title="使用 Google 帳號登入"
    >
      <button className={classes.googleCallback} type="submit">
        Google +
      </button>
    </form>
  );
};

export default GoogleCallback;
