import React from "react";

import UserIntro from "./UserIntro";
import UserService from "./UserService";

import classes from "./UserInfo.module.css";

const UserInfo = (props) => {
  return (
    <div className={classes.userInfo}>
      <UserIntro />
      <UserService />
    </div>
  );
};

export default UserInfo;
