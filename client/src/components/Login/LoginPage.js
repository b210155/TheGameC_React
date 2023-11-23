import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import LoginFuncSelect from "./LoginFuncSelect";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Logout from "./Logout/Logout";
import LoginWarning from "./Warning/LoginWarning";

import classes from "./LoginPage.module.css";

const LoginPage = () => {
  /* 用戶狀態 */
  const isUserLoggedIn = useSelector((state) => state.login.isUserLoggedIn);

  /* 登入or註冊狀態 */
  const [funcSelect, setFuncSelect] = useState("Login");
  // 登入/註冊 UI 切換
  const funcChangeHandler = (selected) => {
    setFuncSelect(selected); // Login || Register
  };

  /* 警告視窗 */
  const [warning, setWarning] = useState(false); // 視窗開關
  const [warningContent, setWarningContent] = useState({}); // 視窗內容

  /* 從其他網頁導過來的警告內容 */
  const location = useLocation();
  const notLoginWarning = location.state;
  useEffect(() => {
    if (notLoginWarning) {
      setWarning(true); // 打開警告視窗
      setWarningContent(notLoginWarning.text); // 警告內容
    }
  }, [notLoginWarning]);

  /* 關閉警告視窗 */
  const warningCloseHandler = () => {
    setWarning(false);
    setWarningContent({});
  };

  return (
    <div className={classes.loginPage}>
      <Helmet>
        <title>TheGameC - 登入頁</title>
      </Helmet>
      {
        warning ? (
          <LoginWarning
            onDialogClose={warningCloseHandler}
            warning={warningContent}
          />
        ) : null /* 警告視窗 */
      }
      <LoginFuncSelect
        funcSelect={funcSelect}
        onChangeFunc={funcChangeHandler}
      />
      {isUserLoggedIn ? (
        <Logout />
      ) : funcSelect === "Login" ? (
        <Login />
      ) : (
        <Register funcChange={setFuncSelect} />
      )}
    </div>
  );
};

export default LoginPage;
