import React from "react";
import { useSelector } from "react-redux";

import classes from "./LoginFuncSelect.module.css";

const LoginFuncSelect = (props) => {
  const isUserLoggedIn = useSelector((state) => state.login.isUserLoggedIn);

  return (
    <React.Fragment>
      <div className={classes.block}></div>
      <div className={classes.loginFuncSelect}>
        {isUserLoggedIn ? null : (
          <React.Fragment>
            <button
              type="button"
              onClick={() => props.onChangeFunc("Login")}
              className={props.funcSelect === "Login" ? classes.funcSelect : ""}
            >
              登入
            </button>
            <button
              type="button"
              onClick={() => props.onChangeFunc("Register")}
              className={
                props.funcSelect === "Register" ? classes.funcSelect : ""
              }
            >
              註冊
            </button>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default LoginFuncSelect;
