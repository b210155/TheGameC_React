import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateUserInfo } from "../../../../redux/loginSlice";
import { API_URL } from "../../../../constants";

import classes from "./AvatarEditForm.module.css";
import Dialog from "../../../UI/Dialog";

const AvatarEditForm = (props) => {
  /* 用戶狀態 */
  const userInfo = useSelector((state) => state.login.userInfo);
  const dispatch = useDispatch();

  const [previewImg, setPreviewImg] = useState(null); // 預覽圖片狀態
  const [uploadFile, setUploadFile] = useState(null); // 欲上傳檔案狀態

  /* 圖片更新 */
  const showImgHandler = (e) => {
    const file = e.target.files[0];
    // 有收到東西才做以下
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result);
      };
      reader.readAsDataURL(file);
      // file 為要上傳的檔案資料
      setUploadFile(file);
    }
  };

  /* 圖片上傳 + 資料表user.avatar欄位更新 */
  const submitFormHandler = async (e) => {
    e.preventDefault();
    if (uploadFile) {
      const formData = new FormData();
      formData.append("avatar", uploadFile);
      try {
        const response = await axios.post(
          API_URL + "/user/api/avatar_upload",
          formData
        );
        const filePath = response.data.filePath; // 大頭貼上傳後的路徑

        /* 更改 user.avatar */
        try {
          await axios.put(API_URL + "/user/api/user_avatar_update", {
            user_id: userInfo.user_id,
            avatar: filePath,
          });
          // redux 更新狀態 (即時更新UI)
          dispatch(
            updateUserInfo({
              avatar: filePath,
            })
          );
          props.onDialogClose();
        } catch (err) {
          console.error("錯誤獲取:User_Avatar_Update", err.response.data);
        }
      } catch (err) {
        console.error("錯誤獲取 Avatar_Upload:", err.response.data);
        alert(err.response.data.message);
      }
    }
  };

  return (
    <Dialog onDialogClose={props.onDialogClose}>
      <form className={classes.AvatarEditForm} onSubmit={submitFormHandler}>
        <h2 className={classes.title}>更新大頭照</h2>
        <span>步驟：選擇檔案後 1.先上傳圖片 2.再確認更改</span>
        <div className={classes.avatarContainer}>
          <img
            src={
              previewImg ||
              (userInfo.avatar
                ? API_URL + "/static/" + userInfo.avatar
                : "/images/UI/User/avatar_default.jpg")
            }
            alt="大頭照預覽"
          />
        </div>
        <input
          type="file"
          name="avatar"
          accept=".jpg, .jpeg, .png"
          onChange={showImgHandler}
        />
        <span>只接受 jpg、jpeg、png 檔</span>
        <button type="submit">確認更改</button>
      </form>
    </Dialog>
  );
};

export default AvatarEditForm;
