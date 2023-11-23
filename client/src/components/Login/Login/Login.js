import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../constants";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/loginSlice";

import LoginInput from "../LoginInput";
import PasswordForget from "./PasswordForget";
import GoogleCallback from "../OAuth/GoogleCallback";

import classes from "./Login.module.css";

const Login = () => {
  const [forgetPassword, setForgetPassword] = useState(); // 忘記密碼
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /* 開啟/關閉忘記密碼表單 */
  const DialogHandler = () => {
    setForgetPassword((prev) => !prev);
  };

  /* 帳號 input */
  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };

  /* 密碼 input */
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  /* 登入 */
  const dispatch = useDispatch();
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

  /* 提交登入表單 */
  const loginFormHandler = (e) => {
    e.preventDefault();
    userLoginHandler(username, password);
  };

  return (
    <div className={classes.Login}>
      {forgetPassword ? <PasswordForget onDialogClose={DialogHandler} /> : ""}
      <div className={classes.logo}>TheGameC</div>
      <form className={classes.loginForm} onSubmit={loginFormHandler}>
        <LoginInput
          type="text"
          img="user.svg"
          name="username"
          title="請檢查帳號大小寫有無出錯"
          placeholder="使用者名稱"
          value={username}
          onChangeHandler={usernameChangeHandler}
        />
        <LoginInput
          type="password"
          img="password.svg"
          name="password"
          title="請確認字母大小寫是否正確"
          placeholder="使用者密碼"
          autoComplete="current-password"
          value={password}
          onChangeHandler={passwordChangeHandler}
        />
        <button className={classes.loginBtn} type="submit">
          會員登入
        </button>
      </form>
      <span className={classes.forgetPassword} onClick={DialogHandler}>
        忘記密碼
      </span>
      <GoogleCallback />
    </div>
  );
};

export default Login;
