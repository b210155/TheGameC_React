import React, { useState, useEffect } from "react";

import Image from "../UI/Image/Image";
import classes from "./LoginInput.module.css";

const LoginInput = (props) => {
  const [isValid, setIsValid] = useState(false); // 有無通過驗證

  /* 給予 isValid 值 */
  useEffect(() => {
    if (props.onInputValid) {
      props.onInputValid(props.name, isValid);
    }
  }, [isValid]);

  /* 正規表達式驗證 */
  const regex = new RegExp(props.regex);

  /* input change 處理器 */
  const changeInputHandler = (e) => {
    // 先檢查有無正規表達式，有的話先驗證
    if (props.regex) {
      setIsValid(regex.test(e.target.value));
    }
    props.onChangeHandler(e);
  };

  return (
    <div className={classes.inputContainer}>
      <label htmlFor={props.name}>
        <Image src={`/images/UI/Login/${props.img}`} alt={props.name} />
      </label>
      <input
        id={props.name}
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        title={props.title}
        pattern={props.regex}
        autoComplete={props.autoComplete || ""}
        onChange={changeInputHandler}
        value={props.value}
        required
        readOnly={props.readOnly}
      />
    </div>
  );
};

export default LoginInput;
