import React, { useState, useEffect } from "react";

import classes from "./UserServiceItem.module.css";

const UserServiceItem = (props) => {
  const [solve, setSolve] = useState(false);

  useEffect(() => {
    if (props.reply) {
      props.reply.is_resolved ? setSolve(true) : setSolve(false);
    }
  }, [props.editAllow, props.reply.is_resolved]);

  /* input onChange 切換是否已解決 */
  const inputChangeHandler = () => {
    const newState = !solve;
    setSolve(newState);
    props.onchangeCheckbox(props.reply.service_id, newState);
  };

  return (
    <div className={classes.userServiceItem}>
      <input
        type="checkbox"
        onChange={inputChangeHandler}
        className={
          props.editAllow && props.reply.is_resolved == 0
            ? null
            : classes.notAllowEdit
        }
        value={solve}
        checked={solve}
        title="問題是否已解決?"
      />
      <span className={classes.category}>
        {props.index + " " + props.reply.category}
      </span>
      <span className={classes.subject} title={props.reply.subject}>
        {props.reply.subject}
      </span>
      <span
        className={`${classes.solve} ${solve ? classes.done : classes.notYet}`}
        title="編輯為已解決後就無法再更改"
      >
        {solve ? "已解決" : "尚未解決"}
      </span>
    </div>
  );
};

export default UserServiceItem;
