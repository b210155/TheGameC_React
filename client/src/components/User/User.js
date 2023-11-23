import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { IS_LOGGED_IN_KEY } from "../../constants"; // 常量，其值會用來判別 session 是否存有登入

import UserFuncSelect from "./UserFuncSelect";
import UserMainContent from "./UserMainContent";

import classes from "./User.module.css";

const User = () => {
  /* 用戶狀態 */
  const isUserLoggedIn = useSelector((state) => state.login.isUserLoggedIn);
  const session_Login = sessionStorage.getItem(IS_LOGGED_IN_KEY);

  /* 若未登入，則進入登入頁面 */
  const navigate = useNavigate();
  useEffect(() => {
    // 重新整理時 isUserLoggedIn 的資料可能會有延遲，造成這種馬上就執行的還沒拿到資料就執行，
    // 所以用本地儲存的資料也加入判斷，避免 isUserLoggedIn 尚未拿到資料就直接轉頁面。
    // * session_Login 來自 sessionStorage，isUserLoggedIn 來自 redux
    if (session_Login !== "1" && !isUserLoggedIn) {
      navigate("/login", {
        state: {
          text: "您尚未登入帳號，登入後即可查看【個人資訊】內容。",
        },
      });
    }
  }, [isUserLoggedIn, session_Login, navigate]);

  /* 切換類型(狀態) */
  const [func, setFunc] = useState("個人資訊"); // 切換類型

  /* 切換類型 */
  const funcChangeHandler = (selectFunc) => {
    setFunc(() => selectFunc);
  };

  return (
    <div className={classes.User}>
      {isUserLoggedIn ? (
        <React.Fragment>
          <Helmet>
            <title>TheGameC - 個人資訊</title>
          </Helmet>
          <UserFuncSelect onFuncChange={funcChangeHandler} selectFunc={func} />
          <UserMainContent selectFunc={func} />
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default User;
