import React from "react";

import AboutIdeaBox from "./AboutIdeaBox";

import classes from "./AboutIdea.module.css";

// 理念資料
const datas = [
  {
    name: "團隊合作",
    image: "team.jpg",
    content:
      "「團隊合作」是營運成功的關鍵。我們深知，每個優秀的商品的問世都是多方協力的結果。因此，我們注重培養開放溝通、互相尊重和信任的工作環境。我們鼓勵員工跨部門合作，以達到卓越的產品品質和客戶服務，讓公司文化和價值觀在每一個細節中得以體現。",
  },
  {
    name: "誠信交易",
    image: "trade.jpg",
    content:
      "在我們這裡，「誠信交易」不僅是一個口號，更是我們營運的核心價值。我們深信，遊戲不僅是一種娛樂方式，也是建立信任和社群的橋樑。因此，我們致力於提供高質量、價格公正的遊戲產品，並確保交易過程透明、公正、無欺詐。我們重視每一位客戶的反饋，並且持續改進，以達到消費者和我們之間的最高信任度。",
  },
  {
    name: "熱情服務",
    image: "service.jpg",
    content:
      "我們的線上客服團隊不僅具備專業的商品知識，更注重用心聆聽，以達到您的每一個需求。您隨時都能得到即時的支援和解答。我們相信，優質的客服不僅能解決問題，更能加強體驗品質，讓您真正感受到我們的用心和熱情。因為在我們看來，最好的服務是讓您感到賓至如歸。",
  },
  {
    name: "即時更新",
    image: "newProduct.jpg",
    content:
      "我們明白遊戲業界變化快速，玩家對新鮮體驗的渴求無窮。因此，我們的目標是時刻提供最新、最熱門的遊戲選項，讓您能立即體驗到業界的最新動態。透過與各大遊戲開發商緊密合作，我們確保能在第一時間獲得最新遊戲，並且快速更新我們的產品目錄。這是我們對您，也是對我們自己的承諾。",
  },
  {
    name: "多樣性",
    image: "diversity.jpg",
    content:
      "玩家各有所好，因此我們致力於提供廣泛的遊戲類型，從動作、冒險到策略和模擬，應有盡有。透過與各大遊戲開發商和發行商建立堅固的合作關係，我們能夠在第一時間引入市場上最新、最受期待的遊戲。這不僅滿足了玩家多元化的需求，也讓我們的產品線更加豐富和全面。",
  },
  {
    name: "前瞻與戰略",
    image: "prospect.jpg",
    content:
      "「前瞻戰略」是我們業務成功的重要支柱。我們積極洞察遊戲產業的未來趨勢和消費者需求，並根據這些洞見制定長期戰略。透過與遊戲開發商和其他行業夥伴建立深厚的合作關係，我們能在最短時間內獲得並推出最新、最具創意的遊戲產品，確保了我們能持續為客戶提供卓越的遊戲體驗。",
  },
];

const AboutIdea = () => {
  return (
    <div className={classes.aboutIdea}>
      {/* 標題 */}
      <span className={classes.title}>我們的理念</span>
      <span className={classes.separator}></span>
      {/* 主要內容 */}
      <div className={classes.boxContainer}>
        {datas.map((data) => (
          <AboutIdeaBox key={data.name} data={data} />
        ))}
      </div>
    </div>
  );
};

export default AboutIdea;
