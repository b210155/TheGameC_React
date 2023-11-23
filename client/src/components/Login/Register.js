import React, { useState } from "react";
import { API_URL } from "../../constants";
import axios from "axios";

import LoginInput from "./LoginInput";
import classes from "./Register.module.css";

const Register = (props) => {
  /* 狀態：input 當前值 */
  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    password: "",
    passwordComfirm: "",
    email: "",
    phone: "",
    birthday: "",
  });

  /* 狀態：input值是否通過驗證 */
  const [isValid, setIsValid] = useState({
    username: false,
    password: false,
    passwordComfirm: false,
    email: false,
    phone: false,
  });

  /* input 輸入處理器 */
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setRegisterInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* input 驗證是否通過處理器 */
  const inputValidHandler = (name, valid) => {
    setIsValid((prev) => ({ ...prev, [name]: valid }));
  };

  /* 年齡確認 */
  const calculateAge = (date) => {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

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
        props.funcChange("Login");
      } catch (err) {
        console.error("錯誤獲取 register:", err.response.data);
        alert(err.response.data.message);
      }
    } else {
      alert("資料請填寫完整。");
    }
  };

  /* 送出表單 */
  const registerFormHandler = (e) => {
    e.preventDefault();
    // 正規表達驗證
    if (Object.values(isValid).some((value) => !value))
      // Object.values會獲取物件所有值組成陣列；some()給予函數測試，若至少有一者通過，則為true
      return alert("請確保所有格式都符合規則。");
    // 密碼重複輸入驗證
    if (registerInfo.password !== registerInfo.passwordComfirm)
      return alert("密碼與再次輸入的密碼不相符。");
    // 年齡驗證
    let age = calculateAge(registerInfo.birthday);
    if (age < 12) {
      return alert("用戶年齡不得小於 12 歲。");
    }
    userRegisterHandler(registerInfo);
  };

  return (
    <div className={classes.Register}>
      <div className={classes.logo}>TheGameC</div>
      <form onSubmit={registerFormHandler}>
        <div>
          <div className={classes.section}>
            {/* 使用者名稱 */}
            <LoginInput
              type="text"
              img="user.svg"
              name="username"
              regex="^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,}$" // 正規表達
              title="請輸入至少 6 碼以上英文加數字，不能包含特殊字元"
              placeholder="使用者名稱"
              value={registerInfo.username}
              isValid={isValid.username}
              onChangeHandler={inputChangeHandler}
              onInputValid={inputValidHandler}
            />
            {/* 密碼 */}
            <LoginInput
              type="password"
              img="password.svg"
              name="password"
              regex="^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,}$"
              title="請輸入至少 6 碼以上英文加數字，不能包含特殊字元"
              placeholder="請輸入密碼"
              autoComplete="new-password"
              value={registerInfo.password}
              isValid={isValid.password}
              onChangeHandler={inputChangeHandler}
              onInputValid={inputValidHandler}
            />
            <LoginInput
              type="password"
              img="password.svg"
              name="passwordComfirm"
              regex="^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,}$"
              title="請確認與原輸入密碼相同"
              placeholder="請再次輸入密碼"
              value={registerInfo.passwordComfirm}
              isValid={isValid.passwordComfirm}
              onChangeHandler={inputChangeHandler}
              onInputValid={inputValidHandler}
            />
          </div>
          <div className={classes.section}>
            {/* 電子信箱 */}
            <LoginInput
              type="email"
              img="mail.svg"
              name="email"
              regex="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              title="請檢查電子信箱格式是否正確"
              placeholder="電子信箱"
              value={registerInfo.email}
              isValid={isValid.email}
              onChangeHandler={inputChangeHandler}
              onInputValid={inputValidHandler}
            />
            {/* 電話 */}
            <LoginInput
              type="tel"
              img="phone.svg"
              name="phone"
              regex="^09\d{2}\d{6}$"
              title="請輸入 09 開頭的 10 碼電話號碼"
              placeholder="電話號碼"
              value={registerInfo.phone}
              isValid={isValid.phone}
              onChangeHandler={inputChangeHandler}
              onInputValid={inputValidHandler}
            />
            {/* 出生日期 */}
            <LoginInput
              type="date"
              img="birthday.svg"
              name="birthday"
              title="用戶的年齡不得小於 12 歲"
              placeholder="出生日期"
              value={registerInfo.birthday}
              onChangeHandler={inputChangeHandler}
            />
          </div>
        </div>

        <button
          className={classes.registerBtn}
          type="submit"
          onClick={registerFormHandler}
        >
          帳號註冊
        </button>
      </form>
    </div>
  );
};

export default Register;
