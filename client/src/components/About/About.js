import React from "react";
import { Helmet } from "react-helmet";

import AboutIntro from "./Section1/AboutIntro";
import AboutIdea from "./Section2/AboutIdea";
import AboutJoin from "./Section3/AboutJoin";
import AboutContact from "./Section4/AboutContact";

import classes from "./About.module.css";

const About = () => {
  return (
    <div className={classes.about}>
      <Helmet>
        <title>TheGameC - 關於 TheGameC</title>
      </Helmet>
      {/* 入場畫面 */}
      <AboutIntro />
      {/* 理念介紹 */}
      <AboutIdea />
      {/* 公司介紹 */}
      <AboutJoin />
      {/* 聯絡資訊 */}
      <AboutContact />
    </div>
  );
};

export default About;
