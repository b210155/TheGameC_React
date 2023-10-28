import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

import ServiceForm from "./ServiceForm";
import ServiceQA from "./ServiceQA";

import classes from "./Service.module.css";

const Service = () => {
  const [type, setType] = useState("QA");
  const [reply, setReply] = useState({}); // 從其他頁送來的請求

  /* 切換功能 */
  const typeChangeHandler = (type) => {
    setType(type);
  };

  /* 其他頁面帶指令過來 */
  const location = useLocation();
  const productReply = location.state;
  useEffect(() => {
    if (productReply) {
      setType(productReply.funcType);
      setReply(productReply);
    }
  }, [productReply]);

  return (
    <div className={classes.bg}>
      <Helmet>
        <title>TheGameC - 客服</title>
      </Helmet>
      <div className={classes.service}>
        <span className={classes.bigTitle}>
          歡迎來到客服系統
          <br /> 請問您需要什麼協助呢？
        </span>
        <div className={classes.separate}></div>
        <div className={classes.btnContainer}>
          <button
            className={type === "QA" ? classes.select : null}
            onClick={() => typeChangeHandler("QA")}
          >
            常見問題
          </button>
          <button
            className={type === "form" ? classes.select : null}
            onClick={() => typeChangeHandler("form")}
          >
            提交表單
          </button>
        </div>
        {type === "QA" ? <ServiceQA /> : null}
        {type === "form" ? <ServiceForm reply={reply} /> : null}
      </div>
    </div>
  );
};

export default Service;
