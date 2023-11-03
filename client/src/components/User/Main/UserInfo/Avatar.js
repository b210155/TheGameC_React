import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../../../../constants";

import AvatarEditForm from "./AvatarEditForm";

import Image from "../../../UI/Image/Image";
import classes from "./Avatar.module.css";

const Avatar = (props) => {
  const userInfo = useSelector((state) => state.login.userInfo);

  const [openForm, setOpenForm] = useState(false);

  const openFormHandler = () => {
    setOpenForm((prev) => !prev);
  };

  return (
    <div className={classes.avatar} title="更新大頭照">
      {openForm ? <AvatarEditForm onDialogClose={openFormHandler} /> : null}
      <img
        className={classes.avatarImg}
        src={
          userInfo.avatar
            ? API_URL + "/static/" + userInfo.avatar
            : "/images/UI/User/avatar_default.jpg"
        }
        alt="大頭照"
        onClick={openFormHandler}
      />
      <Image
        className={classes.avatarEditBtn}
        src="/images/UI/User/avatarEdit.svg"
        alt=""
        onClick={openFormHandler}
      />
    </div>
  );
};

export default Avatar;
