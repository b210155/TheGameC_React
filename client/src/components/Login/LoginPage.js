import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { API_URL } from "../../constants";

import { login, logout } from "../../redux/loginSlice";

import LoginFuncSelect from "./LoginFuncSelect";
import Login from "./Login";
import Register from "./Register";
import Logout from "./Logout";
import LoginWarning from "./Warning/LoginWarning";

import classes from "./LoginPage.module.css";

const LoginPage = (props) => {
  /* 用戶狀態 */
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector((state) => state.login.isUserLoggedIn);
  const userInfo = useSelector((state) => state.login.userInfo);

  /* 登入or註冊狀態 */
  const [funcSelect, setFuncSelect] = useState("Login"); // 未登入時，使用登入功能或註冊功能
  /* 警告視窗 */
  const [warning, setWarning] = useState(false); // 視窗開關
  const [warningContent, setWarningContent] = useState({}); // 視窗內容

  /* 登入/註冊 UI 切換 */
  const funcChangeHandler = (selected) => {
    // Login || Register
    setFuncSelect(selected);
  };

  /* 登入 */
  const userLoginHandler = async (username, password) => {
    try {
      const response = await axios.post(
        API_URL + "/login/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
          // 確保 session ID cookie 在前後端正確傳遞，從而允許Passport進行用戶反序列化，實現身份驗證。
        }
      );
      alert(response.data.message);
      dispatch(login(response.data.user));
    } catch (err) {
      console.error("錯誤獲取 login:", err.response.data);
      alert(err.response.data.message);
    }
  };

  /* 登出 */
  const logoutHandler = async () =>
    await axios
      .get(API_URL + "/login/logout", { withCredentials: true })
      .then((response) => {
        if (response.data.message === "登出成功") {
          dispatch(logout());
          alert(response.data.message);
        }
      })
      .catch((err) => {
        console.error("登出失敗:", err.response.data);
      });
  {
  }

  /* 註冊 */
  const userRegisterHandler = async ({
    username,
    password,
    email,
    phone,
    birthday,
  }) => {
    if (username && password && email && phone && birthday) {
      try {
        const response = await axios.post(API_URL + "/login/register", {
          username,
          password,
          email,
          phone,
          birthday,
        });
        alert(response.data.message);
        setFuncSelect("Login");
      } catch (err) {
        console.error("錯誤獲取 register:", err.response.data);
        alert(err.response.data.message);
      }
    } else {
      alert("資料請填寫完整。");
    }
  };

  /* 從其他網頁導過來 */
  const location = useLocation();
  const notLoginWarning = location.state;
  useEffect(() => {
    if (notLoginWarning) {
      setWarning(notLoginWarning.openWarning); // 打開警告視窗
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
        <Logout onLogout={logoutHandler} userInfo={userInfo} />
      ) : funcSelect === "Login" ? (
        <Login onLogin={userLoginHandler} />
      ) : (
        <Register onRegister={userRegisterHandler} />
      )}
    </div>
  );
};

export default LoginPage;
