import React, { useState } from "react";
import axios from "axios";
import { API_URL_LOGIN } from "../../../constants";

import Dialog from "../../UI/Dialog";
import LoginInput from "../LoginInput";
import classes from "./PasswordForget.module.css";

const PasswordForget = (props) => {
  /* 新密碼狀態 */
  const [newPasswordState, setNewPasswordState] = useState({
    username: "",
    verifyCode: "",
    newPassword: "",
    newPasswordVerify: "",
  });
  /* 是否已寄出驗證碼 */
  const [isVerifyCodeSubmit, setIsVerifyCodeSubmit] = useState(false);

  /* 密碼驗證狀態(正規表達驗證) */
  const [isValid, setIsValid] = useState({
    newPassword: false,
    newPasswordVerify: false,
  });

  /* onChange新密碼狀態 */
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setNewPasswordState((prev) => ({ ...prev, [name]: value }));
  };

  /* 新密碼驗證狀態 */
  const inputVaildHandler = (name, valid) => {
    setIsValid((prev) => ({ ...prev, [name]: valid }));
  };

  /* 獲取驗證碼 */
  const getVerifyCode = async () => {
    if (!newPasswordState.username) return alert("請輸入使用者名稱");
    try {
      const response = await axios.post(
        `${API_URL_LOGIN}/password_reset_mail_verify`,
        { username: newPasswordState.username }
      );
      setIsVerifyCodeSubmit(true);
      alert(response.data.message);
    } catch (err) {
      console.error("錯誤獲取 password_reset_mail_verify:", err);
      alert(err.response.data.message || "獲取驗證碼出錯，請稍後在試");
    }
  };

  /* 送出表單 */
  const submitFormHandler = async (e) => {
    e.preventDefault();
    // 正規表達式驗證
    if (Object.values(isValid).some((value) => !value))
      return alert("請確保密碼格式符合規則。");
    // 密碼相符驗證
    if (newPasswordState.newPassword !== newPasswordState.newPasswordVerify)
      return alert("您的兩次密碼輸入不相同，請再次輸入。");
    try {
      const response = await axios.put(`${API_URL_LOGIN}/password_reset`, {
        passwordState: newPasswordState,
      });
      setNewPasswordState({
        username: "",
        verifyCode: "",
        newPassword: "",
        newPasswordVerify: "",
      });
      alert(response.data.message);
      props.onDialogClose();
    } catch (err) {
      console.error("錯誤獲取 password_reset:", err);
      alert(err.response.data.message);
    }
  };

  return (
    <Dialog onDialogClose={props.onDialogClose}>
      <form className={classes.passwordForgetForm} onSubmit={submitFormHandler}>
        <span className={classes.logo}>填寫您的新密碼</span>
        <LoginInput
          type="text"
          img="user.svg"
          name="username"
          placeholder="使用者名稱"
          title="驗證碼寄出後，此欄位將無法再更動"
          value={newPasswordState.username}
          onChangeHandler={inputChangeHandler}
          readOnly={isVerifyCodeSubmit}
        />
        <button
          type="button"
          className={classes.getVerify}
          onClick={getVerifyCode}
        >
          獲取驗證碼
        </button>
        <LoginInput
          type="text"
          img="mail.svg"
          name="verifyCode"
          title="若沒收到驗證碼，請稍待片刻或再次點選獲取驗證碼"
          placeholder="請填寫信箱內的驗證碼"
          value={newPasswordState.verifyCode}
          onChangeHandler={inputChangeHandler}
        />
        <LoginInput
          type="password"
          img="password.svg"
          name="newPassword"
          regex="^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,}$"
          title="請輸入至少6碼以上英文加數字，且不能包含特殊字元"
          placeholder="請填寫新密碼"
          value={newPasswordState.newPassword}
          onChangeHandler={inputChangeHandler}
          onInputValid={inputVaildHandler}
        />
        <LoginInput
          type="password"
          img="password.svg"
          name="newPasswordVerify"
          regex="^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,}$"
          title="請確認與原輸入密碼相同"
          placeholder="再次輸入新密碼"
          value={newPasswordState.newPasswordVerify}
          onChangeHandler={inputChangeHandler}
          onInputValid={inputVaildHandler}
        />
        <button className={classes.newPasswordBtn}>提交新密碼</button>
      </form>
    </Dialog>
  );
};

export default PasswordForget;
