import React from "react";
import axios from "axios";

import UserInfo from "./Main/UserInfo/UserInfo";
import UserProducts from "./Main/UserProducts/UserProducts";
import UserSafe from "./Main/UserSafe/UserSafe";

import classes from "./UserMainContent.module.css";

const UserMainContent = (props) => {
  /* 主頁面的內容選擇 */
  let selectFunc;
  switch (props.selectFunc) {
    case "個人資訊":
      selectFunc = <UserInfo />;
      break;
    case "帳戶安全":
      selectFunc = <UserSafe />;
      break;
    case "我的商品":
      selectFunc = <UserProducts />;
      break;
    default:
      selectFunc = <UserInfo />;
  }

  return <div className={classes.UserMainContent}>{selectFunc}</div>;
};

export default UserMainContent;
