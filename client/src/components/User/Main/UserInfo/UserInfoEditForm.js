import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "../../../../redux/loginSlice";
import { API_URL } from "../../../../constants";

import Dialog from "../../../UI/Dialog";
import classes from "./UserInfoEditForm.module.css";

const UserInfoEditForm = (props) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.login.userInfo);

  /* 更新用戶資訊 */
  const userInfoUpdateHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        API_URL + "/user/api/user_info_update",
        {
          nickname: e.target.nickname.value, // 通過 name 屬性來訪問 value
          phone: e.target.phone.value,
          user_id: userInfo.user_id,
        }
      );
      alert(response.data.message);
      // redux 更新狀態 (即時更新UI)
      dispatch(
        updateUserInfo({
          nickname: e.target.nickname.value,
          phone: e.target.phone.value,
        })
      );
      props.onDialogClose();
    } catch (err) {
      console.error("錯誤獲取 UserInfo_Update:", err.response.data);
      alert(err.response.data.message);
    }
  };

  return (
    <Dialog onDialogClose={props.onDialogClose}>
      <form
        className={classes.UserInfoEditForm}
        onSubmit={userInfoUpdateHandler}
      >
        <span className={classes.logo}>修改基本資料</span>
        <ul>
          <li>
            <label>暱稱：</label>
            <input
              type="text"
              name="nickname"
              placeholder="新的暱稱"
              defaultValue={userInfo.nickname || userInfo.username}
            />
          </li>
          <li>
            <label>電話號碼：</label>
            <input
              type="tel"
              name="phone"
              placeholder="新的電話號碼"
              title="請輸入09開頭的10碼電話號碼"
              defaultValue={userInfo.phone}
            />
          </li>
        </ul>
        <button className={classes.confirmBtn} type="submit">
          確認更改
        </button>
      </form>
    </Dialog>
  );
};

export default UserInfoEditForm;
