import React from "react";
import HomeAboutItem from "./HomeAboutItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Arrow_next from "../../UI/Arrow/Arrow_next";
import Arrow_prev from "../../UI/Arrow/Arrow_prev";

import classes from "./HomeAbout.module.css";
import "../HomeSlider.css";

const aboutData = [
  { text: "經典的遊戲", image: "high-quality.jpg" },
  { text: "優惠的價格", image: "price.jpg" },
  { text: "多樣的選擇", image: "diverse.jpg" },
  { text: "高效的客服", image: "service.jpg" },
  { text: "堅實的團隊", image: "team.jpg" },
];

const HomeAbout = () => {
  /* 輪播圖 */
  const carouselSettings = {
    className: "center",
    centerMode: true,
    centerPadding: "0",
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: true,
    nextArrow: <Arrow_next />,
    prevArrow: <Arrow_prev />,
  };

  return (
    <div className={classes.homeAbout}>
      <div className={classes.titleContainer}>
        <span className={classes.title}>歡迎來到 TheGameC</span>
        <span className={classes.text}>我們致力於為您提供</span>
      </div>
      <div className={classes.mainContainer}>
        <Slider {...carouselSettings} className={classes.fullWidthSlider}>
          {aboutData.map((data) => (
            <HomeAboutItem key={data.text} data={data} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HomeAbout;
