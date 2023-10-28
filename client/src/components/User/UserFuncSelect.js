import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/loginSlice";
import axios from "axios";
import { API_URL_LOGIN } from "../../constants";

import classes from "./UserFuncSelect.module.css";

const UserFuncSelect = (props) => {
  /* 用戶操作 */
  const dispatch = useDispatch();

  /* 登出 */
  const logoutHandler = async () =>
    await axios
      .get(API_URL_LOGIN + "/logout", { withCredentials: true })
      .then((response) => {
        if (response.data.message === "登出成功") {
          dispatch(logout());
          alert(response.data.message);
        }
      })
      .catch((err) => {
        console.error("登出失敗:", err.response.data);
      });

  /* 選擇功能按鈕 */
  const funcChangerBtn = (e) => {
    props.onFuncChange(e.target.innerText);
  };

  // 被選擇者套用 css
  const isFuncSelected = (select) => {
    return props.selectFunc === select ? classes.funcSelect : "";
  };

  /* 打開/關閉選單按鈕 */
  const [openSelectBtn, setOpenSelectBtn] = useState(true);
  const openSelectHandler = () => {
    setOpenSelectBtn((prev) => !prev);
  };

  /* 依照螢幕大小隱藏/展開選單 */
  const [showSelect, setShowSelect] = useState(true);
  const handleResize = () => {
    if (window.innerWidth < 1160) {
      setShowSelect(false);
      setOpenSelectBtn(false);
    } else if (window.innerWidth >= 1160) {
      setShowSelect(true);
      setOpenSelectBtn(true);
    }
  };
  useEffect(() => {
    // 在組件掛載時添加 resize 事件監聽器
    window.addEventListener("resize", handleResize);
    // 初始檢查
    handleResize();
    // 在組件卸載時移除事件監聽器
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <React.Fragment>
      <img
        className={classes.showFuncSelectBtn}
        src={`/images/UI/common_button/arrow_${
          openSelectBtn ? "left" : "right"
        }.png`}
        alt="開啟資訊欄位"
        onClick={openSelectHandler}
      />
      <div
        className={`${classes.UserFuncSelect_block} ${
          showSelect ? classes.showFuncSelect : classes.dontShowFuncSelect
        }`}
      ></div>
      <div
        className={`${classes.UserFuncSelect} ${
          showSelect ? null : classes.dontShowFuncSelect
        } ${openSelectBtn ? classes.showFuncSelect : null}`}
      >
        <button
          type="button"
          onClick={funcChangerBtn}
          className={isFuncSelected("個人資訊")}
        >
          個人資訊
        </button>
        <button
          type="button"
          onClick={funcChangerBtn}
          className={isFuncSelected("帳戶安全")}
        >
          帳戶安全
        </button>
        <button
          type="button"
          onClick={funcChangerBtn}
          className={isFuncSelected("我的商品")}
        >
          我的商品
        </button>
        <button type="button" onClick={logoutHandler}>
          登出
        </button>
      </div>
    </React.Fragment>
  );
};

export default UserFuncSelect;
