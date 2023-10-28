import React from "react";

import AboutJoinSelect from "./AboutJoinSelect";
import classes from "./AboutJoin.module.css";

/* 加入我們資料 */
const datas = [
  {
    name: "技術與技能",
    content:
      "不論是畫面設計、編寫程式、業務專業、行政經歷，只要您對我們的工作充滿熱情，就儘管展現您的能力吧！",
  },
  {
    name: "價值觀",
    content:
      "如果您與我們有相同的價值觀，歡迎您前來我們公司，我們絕對尊重任何員工的想法。",
  },
  {
    name: "未來展望",
    content:
      "盡情分享您對自己以及世界未來的看法，只要您有能力，我們就會成為您一展鴻圖的強力支持！",
  },
  {
    name: "薪資與福利",
    content:
      "這裡有整個業界最公開透明的薪資待遇，以及最令人滿意的福利，歡迎您來開出您的條件！",
  },
];

const AboutJoin = () => {
  return (
    <div className={classes.aboutJoin}>
      {/* 標題 */}
      <span className={classes.title}>加入 TheGameC</span>
      <span className={classes.separator}></span>
      <span>
        如果您對我們的理念感興趣，或對自己的技術有自信的話，歡迎您與我們一同向前邁進
      </span>
      {/* 主要內容 */}
      <div className={classes.main}>
        {/* 大圖 */}
        <div className={classes.imgContainer}>
          <img src="/images/UI/About/usingComputer.jpg" alt="圖片" />
        </div>
        {/* 內文 */}
        {/* 選擇器 */}
        <div className={classes.selectContainer}>
          {datas.map((data) => (
            <AboutJoinSelect key={data.name} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutJoin;
