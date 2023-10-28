import React from "react";
import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import classes from "./Dialog.module.css";

const Dialog = (props) => {
  // 使用傳送門
  return ReactDOM.createPortal(
    <div>
      <Backdrop />
      <div className={classes.dialog}>
        <div className={classes.title}>
          <img
            src="/images/UI/common_button/cancel.svg"
            onClick={props.onDialogClose}
            alt="關閉視窗"
          />
        </div>
        <div className={classes.title_block}></div>
        <div className={classes.content}>{props.children}</div>
      </div>
    </div>,
    document.getElementById("portal-root") // 指向 index.html #portal-root 元素
  );
};

export default Dialog;
