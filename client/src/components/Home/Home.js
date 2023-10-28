import React from "react";

import HomePopular from "./HomePopular/HomePopular";
import HomeNewProducts from "./HomeNewProducts/HomeNewProducts";
import HomeAbout from "./HomeAbout/HomeAbout";
import HomeJoin from "./HomeJoin/HomeJoin";

import classes from "./Home.module.css";

const Home = () => {
  return (
    <React.Fragment>
      <div className={classes.home}>
        <HomePopular />
        <HomeNewProducts />
        <HomeAbout />
        <HomeJoin />
      </div>
    </React.Fragment>
  );
};

export default Home;
