import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL_SERVICE } from "../../constants";
import { useSelector } from "react-redux";

import classes from "./ServiceForm.module.css";

const ServiceForm = (props) => {
  /* 用戶狀態 */
  const isUserLoggedIn = useSelector((state) => state.login.isUserLoggedIn);
  const userInfo = useSelector((state) => state.login.userInfo);

  /* 表單狀態 */
  const [form, setForm] = useState({
    category: "",
    subject: "",
    description: "",
  });

  /* 來自其他網頁的請求 */
  useEffect(() => {
    setForm({
      category: props.reply.replyType,
      subject: props.reply.replyTitle,
      description: props.reply.replyText,
    });
  }, [props.reply]);

  /* 更動表單內容 */
  const formChangeHandler = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* 送出表單 */
  const submitHandler = async (e) => {
    e.preventDefault();
    if (isUserLoggedIn && userInfo) {
      if (form.category && form.description && form.subject) {
        if (form.category === "請選擇類別") return alert("問題類別尚未選擇。");
        try {
          const response = await axios.post(
            `${API_URL_SERVICE}/service_insert/?user_id=${userInfo.user_id}`,
            form
          );
          alert(response.data.message);
          setForm({
            category: "",
            subject: "",
            description: "",
          });
        } catch (err) {
          alert(err.response.data.message);
        }
      } else {
        alert("請將表單填寫完全，不能有欄位是空白。");
      }
    } else {
      alert("登入後才可以提交表單。");
    }
  };

  return (
    <form className={classes.serviceForm} onSubmit={submitHandler}>
      {isUserLoggedIn ? null : (
        <span style={{ color: "red" }}>登入後即可使用表單</span>
      )}
      <span className={classes.title}>提交表單</span>
      {/* 問題類別 */}
      <div className={classes.inputContainer}>
        <span className={classes.title}>選擇問題類別</span>
        <select
          className={isUserLoggedIn ? null : classes.noAllow}
          onChange={formChangeHandler}
          name="category"
          value={form.category}
        >
          <option>請選擇類別</option>
          <option>帳號問題</option>
          <option>商品問題</option>
          <option>聯絡客服</option>
          <option>其他問題</option>
        </select>
      </div>
      {/* 主旨 */}
      <div className={classes.inputContainer}>
        <span className={classes.title}>主旨</span>
        <input
          className={isUserLoggedIn ? null : classes.noAllow}
          onChange={formChangeHandler}
          placeholder="輸入主要目的 (最多25字)"
          name="subject"
          maxLength={25}
          value={form.subject}
        />
      </div>
      {/* 說明 */}
      <div className={classes.inputContainer}>
        <span className={classes.title}>說明</span>
        <textarea
          className={isUserLoggedIn ? null : classes.noAllow}
          onChange={formChangeHandler}
          placeholder="說明您遇到的情況 (最多1000字)"
          name="description"
          maxLength={1000}
          value={form.description}
        />
      </div>
      <button
        type="submit"
        className={`${classes.submitBtn} ${
          isUserLoggedIn ? null : classes.noAllow
        }`}
      >
        提交
      </button>
    </form>
  );
};

export default ServiceForm;
