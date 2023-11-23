import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../constants";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/loginSlice";
import { useSelector } from "react-redux";

import classes from "./Logout.module.css";

const Logout = () => {
  /* 用戶狀態 */
  const userInfo = useSelector((state) => state.login.userInfo);

  /* 導入個人資訊頁 */
  const navigate = useNavigate();
  const goToUser = () => {
    navigate("/user");
  };

  /* 登出 */
  const dispatch = useDispatch();
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

  return (
    <div className={classes.Logout}>
      <div className={classes.logo}>TheGameC</div>
      <span>
        歡迎!{" "}
        <span
          className={classes.userName}
          onClick={goToUser}
          title="前往個人資訊"
        >
          {userInfo.nickname || userInfo.username}
        </span>
        ，您已經登入成功 !
      </span>
      <button onClick={logoutHandler}>登出</button>
    </div>
  );
};

export default Logout;
