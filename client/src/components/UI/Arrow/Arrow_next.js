import React from "react";

import Image from "../Image/Image";
import classes from "./Arrow.module.css";

const Arrow_next = (props) => {
  const { onClick } = props;
  return (
    <div onClick={onClick} className={`${classes.arrow} ${classes.arrow_next}`}>
      <Image src="/images/UI/common_button/arrow_next.svg" alt="箭頭" />
    </div>
  );
};

export default Arrow_next;
