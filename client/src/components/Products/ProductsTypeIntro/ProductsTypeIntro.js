import React, { useState, useEffect } from "react";

import Image from "../../UI/Image/Image";
import classes from "./ProductsTypeIntro.module.css";

const ProductsTypeIntro = () => {
  /* 類型選擇 */
  const [type, setType] = useState({
    name: "動作",
    image: "action",
    intro:
      "動作遊戲是一個刺激且高速度的遊戲類型，它注重於玩家的手眼協調和反應速度。玩家通過各種不同的環境和關卡，同時面對敵人的攻擊。動作遊戲的核心是戰鬥和動作，包括跳躍、射擊、格鬥等。此類型包括《俠盜列車手》、《極地戰壕》和《惡靈勢力》等，這些遊戲非常刺激，需要玩家具有高度的技能和耐心。動作類型是市場上最受歡迎和最持久的類型之一，能夠提供無與倫比的刺激和樂趣。",
  });

  /* 下拉選單狀態 */
  const [dropDown, setDropDown] = useState(false); // 是否展開
  const dropDownHandler = () => {
    setDropDown((prev) => !prev);
  };

  /* 不同類型的背景 */
  const typeChangeHandler = (type) => {
    switch (type) {
      case "動作":
        setType({
          name: "動作",
          image: "action",
          intro:
            "動作遊戲是一個刺激且高速度的遊戲類型，它注重於玩家的手眼協調和反應速度。玩家通過各種不同的環境和關卡，同時面對敵人的攻擊。動作遊戲的核心是戰鬥和動作，包括跳躍、射擊、格鬥等。此類型包括《俠盜列車手》、《極地戰壕》和《惡靈勢力》等，這些遊戲非常刺激，需要玩家具有高度的技能和耐心。動作類型是市場上最受歡迎和最持久的類型之一，能夠提供無與倫比的刺激和樂趣。",
        });
        break;
      case "冒險":
        setType({
          name: "冒險",
          image: "avg",
          intro:
            "冒險遊戲是一種以故事為核心，強調探索、解謎和角色互動的遊戲類型。在這類遊戲中，玩家通常會被投入一個豐富多彩、情節緊湊的虛擬世界，並且通常有著精心編寫的劇情和深刻的角色描繪，以吸引玩家深入探索並與遊戲世界互動。這類遊戲的經典代表包括《黑色沙漠》、《最後生還者》和《魔物獵人》等，通常提供一個沉浸式的遊戲體驗，讓玩家能夠完全投入到一個令人興奮和感人至深的故事中。",
        });
        break;
      case "模擬":
        setType({
          name: "模擬",
          image: "slg",
          intro:
            "模擬遊戲是一種致力於提供接近現實生活體驗的遊戲類型。玩家可以模擬現實世界中的各種活動和情境，例如經營農場、建造城市、或是駕駛交通工具。經典的模擬遊戲包括《模擬市民》、《海港物語》和《密室逃脫模擬器》等。模擬遊戲通常具有開放性和自由度很高的遊戲環境，通過精細的遊戲機制和真實感的圖形表現，讓玩家能夠在虛擬環境中體驗到不同的職業和生活情境，並發揮自己的創造力。",
        });
        break;
      case "策略":
        setType({
          name: "策略",
          image: "strategy",
          intro:
            "策略遊戲是一種強調思考和計劃的類型，通過分析情況、制定戰略和優化資源來達成遊戲目標。在策略遊戲中，通常需要管理資源、建立基地、組織軍隊，並通過戰術布局來戰勝敵人或完成特定的任務。包括《世紀帝國》、《英雄聯隊》和《文明帝國》等，這些遊戲通常具有豐富的遊戲機制和多樣化的遊戲選項，提供玩家無限的可能性來嘗試不同的策略和方法，逐漸理解遊戲的規則，並找到最有效的策略來勝利。",
        });
        break;
      case "運動與競技":
        setType({
          name: "運動與競技",
          image: "esport",
          intro:
            "運動與競技類型的遊戲模擬了真實世界運動和競技活動，重現真實的運動規則和物理機制，讓玩家在虛擬環境中享受到足球、籃球、賽車等多種運動的樂趣。遊戲提供競爭性強，刺激有趣的遊戲體驗，並通常具有單人與多人模式。包括《FIFA》、《NBA 2K》、《舞力全開》等。這些遊戲具有精緻的圖像和真實的遊戲機制，並提供多種遊戲模式和挑戰，讓玩家可以在不同的比賽和環境中測試自己的技能和策略。",
        });
        break;
      default:
        setType({
          name: "動作",
          image: "action",
          intro:
            "動作遊戲是一個刺激且高速度的遊戲類型，它注重於玩家的手眼協調和反應速度。玩家通過各種不同的環境和關卡，同時面對敵人的攻擊。動作遊戲的核心是戰鬥和動作，包括跳躍、射擊、格鬥等。此類型包括《俠盜列車手》、《極地戰壕》和《惡靈勢力》等，這些遊戲非常刺激，需要玩家具有高度的技能和耐心。動作類型是市場上最受歡迎和最持久的類型之一，能夠提供無與倫比的刺激和樂趣。",
        });
        break;
    }
  };

  /* 切換動畫 */
  const [animation, setAnimation] = useState("");
  useEffect(() => {
    setAnimation(classes.productTypeAnimation);
    const timer = setTimeout(() => setAnimation(""), 500);
    return () => clearTimeout(timer);
  }, [type]);

  return (
    <React.Fragment>
      <div
        className={`${classes.productsTypeIntro} ${
          classes[type.image]
        } ${animation}`}
      >
        <div className={classes.cover}>
          {/* 下拉選單按鈕 */}
          <div
            className={classes.dropBtnContainer}
            onClick={dropDownHandler}
            title="類型介紹"
          >
            <Image
              src={`/images/UI/common_button/${
                dropDown ? "arrow_up" : "arrow_down"
              }.svg`}
            />
          </div>
          {/* 切換類型按鈕 */}
          <div className={classes.btnContainer}>
            <div
              className={`${classes.typeBtn} ${
                type.name === "動作" ? classes.selected : null
              }`}
              onClick={() => typeChangeHandler("動作")}
              title="動作"
            >
              <Image
                src={`/images/UI/product/TypeBg/action_logo.svg`}
                alt="動作"
              />
            </div>
            <div
              className={`${classes.typeBtn} ${
                type.name === "冒險" ? classes.selected : null
              }`}
              onClick={() => typeChangeHandler("冒險")}
              title="冒險"
            >
              <Image
                src={`/images/UI/product/TypeBg/avg_logo.svg`}
                alt="冒險"
              />
            </div>
            <div
              className={`${classes.typeBtn} ${
                type.name === "模擬" ? classes.selected : null
              }`}
              onClick={() => typeChangeHandler("模擬")}
              title="模擬"
            >
              <Image
                src={`/images/UI/product/TypeBg/slg_logo.svg`}
                alt="模擬"
              />
            </div>
            <div
              className={`${classes.typeBtn} ${
                type.name === "策略" ? classes.selected : null
              }`}
              onClick={() => typeChangeHandler("策略")}
              title="策略"
            >
              <Image
                src={`/images/UI/product/TypeBg/strategy_logo.svg`}
                alt="策略"
              />
            </div>
            <div
              className={`${classes.typeBtn} ${
                type.name === "運動與競技" ? classes.selected : null
              }`}
              onClick={() => typeChangeHandler("運動與競技")}
              title="運動與競技"
            >
              <Image
                src={`/images/UI/product/TypeBg/esport_logo.svg`}
                alt="運動與競技"
              />
            </div>
          </div>
        </div>
        {/* 下拉選單 */}
        <div
          className={classes.dropDown}
          style={dropDown ? { height: "100%" } : { height: "0px" }}
          onClick={dropDownHandler}
        >
          <div className={classes.info}>
            <span className={classes.title}>{type.name}</span>
            <span className={classes.intro}>{type.intro}</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductsTypeIntro;
