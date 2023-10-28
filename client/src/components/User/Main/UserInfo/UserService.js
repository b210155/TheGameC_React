import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL_SERVICE } from "../../../../constants";

import UserServiceItem from "./UserServiceItem";

import classes from "./UserService.module.css";

const UserService = () => {
  /* 用戶狀態 */
  const userInfo = useSelector((state) => state.login.userInfo);

  const [reply, setReply] = useState([]); // 獲取回報資料
  const [editAllow, setEditAllow] = useState(false); // 是否編輯客服資料狀態
  const [editReply, setEditReply] = useState([]); // 選取所有有更改過的回答表單 (checkbox)
  const [refreshReply, setRefreshReply] = useState(false); // 重新獲取新的資料 (用於更改過後)

  /* 獲取客服資料 */
  useEffect(() => {
    const dataFetch = async () => {
      if (!userInfo) return alert("資料尚在準備中");
      try {
        const response = await axios.get(
          API_URL_SERVICE + `/service_select/?user_id=${userInfo.user_id}`
        );
        setReply(response.data);
      } catch (err) {
        console.error("錯誤獲取 service_select:", err);
      }
    };
    dataFetch();
  }, [refreshReply]);

  /* 是否編輯客服狀況 */
  const editChangeHandler = () => {
    setEditAllow((prev) => !prev);
    setEditReply([]);
  };

  /* 記錄所有被更動過的 (蒐集全部有更動過的checkbox) */
  const changeCheckboxHandler = (service_id, bool) => {
    // 已從 inputChangeHandler 獲取被改動者的 id 與 boolean
    // 條件：1. 有被改動過 2. false 改為 true 者
    // (概念上，"已解決"的問題，就不該讓用戶能將他改為"未解決"，若同樣情況又出問題，用戶該做的是去重新回報)
    if (bool) {
      // 為 true 者保留置 state
      setEditReply([...editReply, service_id]);
    } else {
      // 由 true 轉為 false 者，過濾掉 (有設定為 true 者不能轉為 false (by css))
      // 這裡再設這個主要是為了保險起見
      setEditReply(editReply.filter((id) => id !== service_id));
    }
  };

  /* 送出結果 */
  const submitChangeHandler = async (e) => {
    e.preventDefault();
    if (editReply.length > 0) {
      try {
        const response = await axios.put(
          API_URL_SERVICE +
            `/service_is_resolved_update/?user_id=${userInfo.user_id}`,
          { service_id: editReply }
        );
        alert(response.data.message);
        setEditReply([]); // 清空以選擇，回到重置狀態
        setRefreshReply((prev) => !prev); // 更新 refreshReply 以重新獲取資料
        editChangeHandler(); // 關閉 Edit
      } catch (err) {
        console.error("錯誤獲取 service_is_resolved_update:", err);
      }
    } else {
      alert("您尚未做出改動。");
    }
  };

  return (
    <form className={classes.userService}>
      <div className={classes.title_btn}>
        <span className={classes.title}>回報處理</span>
        <div className={classes.btnContainer}>
          <span className={classes.amount}>
            共 {reply.length} 筆，其中{" "}
            {reply.filter((item) => item.is_resolved == 0).length} 筆尚未解決
          </span>
          <button
            type="button"
            className={classes.editBtn}
            title="編輯狀態"
            onClick={editChangeHandler}
          >
            {editAllow ? "取消" : "編輯"}
          </button>
          <button
            type="submit"
            className={`${classes.submitBtn} ${
              editAllow ? null : classes.notAllowSubmit
            }`}
            title="送出結果"
            onClick={submitChangeHandler}
          >
            送出
          </button>
        </div>
      </div>
      <div className={classes.separator}></div>
      {/* 客服表單處理狀況 */}
      <div
        className={`${classes.replyContainer} ${
          editAllow ? classes.allowEdit : null
        }`}
        title="滾動查看更多處理狀況"
      >
        {reply.map((item, index) => (
          <UserServiceItem
            key={index}
            reply={item}
            editAllow={editAllow}
            index={index + 1}
            onchangeCheckbox={changeCheckboxHandler}
          />
        ))}
      </div>
    </form>
  );
};

export default UserService;
