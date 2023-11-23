import React from "react";
import { RotatingLines } from "react-loader-spinner";

import "./FullPageLoader.css";

const FullPageLoader = () => {
  return (
    <div className="fullPageLoader">
      <RotatingLines
        strokeColor="lightblue"
        strokeWidth="5"
        animationDuration="0.75"
        width="65"
        visible={true}
      />
    </div>
  );
};

export default FullPageLoader;
