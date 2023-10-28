import React, { useState } from "react";
import { useSelector } from "react-redux";

import Avatar from "./Avatar";
import UserInfoEditForm from "./UserInfoEditForm";
import classes from "./UserIntro.module.css";

const UserIntro = (props) => {
  /* 用戶 */
  const userInfo = useSelector((state) => state.login.userInfo);

  const [editForm, setEditForm] = useState(false); // 打開與否(修改視窗)

  /* 開關修改視窗 */
  const openEditFormHandler = () => {
    setEditForm((prev) => !prev);
  };

  return (
    <div className={classes.UserIntro}>
      <div className={classes.avatarContainer}>
        <Avatar data={userInfo} />
      </div>
      <div className={classes.infoContainer}>
        <span className={classes.title}>個人資訊</span>
        <div className={classes.separator}></div>
        <div className={classes.smallTilteContainer}>
          <span className={classes.smallTitle}>基本資料</span>
          <img
            className={classes.InfoEditBtn}
            src="/images/UI/User/editBtn.svg"
            alt="修改"
            title="修改基本資料"
            onClick={openEditFormHandler}
          />
        </div>

        <table className={classes.infos}>
          <thead>
            <tr>
              <th>暱稱</th>
              <th>使用者名稱</th>
              <th>年齡</th>
              <th>電話號碼</th>
              <th>電子信箱</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{userInfo.nickname || userInfo.username}</td>
              <td>{userInfo.username}</td>
              <td>
                {userInfo.current_age
                  ? userInfo.current_age +
                    " " +
                    (userInfo.current_age >= 18 ? "" : "(未成年)")
                  : "Loading..."}
              </td>
              <td>{userInfo.phone || "尚未設置"}</td>
              <td>{userInfo.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {!editForm ? null : (
        <UserInfoEditForm onDialogClose={openEditFormHandler} />
      )}
    </div>
  );
};

export default UserIntro;
