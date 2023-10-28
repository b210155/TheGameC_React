import React from "react";
import { useNavigate } from "react-router-dom";

import classes from "./Logout.module.css";

const Logout = (props) => {
  /* 進入個人資訊 */
  const navigate = useNavigate();
  const goToUser = () => {
    navigate("/user");
  };

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
          {props.userInfo.nickname || props.userInfo.username}
        </span>
        ，您已經登入成功 !
      </span>
      <button onClick={props.onLogout}>登出</button>
    </div>
  );
};

export default Logout;
