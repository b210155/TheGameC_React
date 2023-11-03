import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../redux/loginSlice";
import { API_URL } from "../../../constants";
import axios from "axios";

import Image from "../Image/Image";
import Search from "../Search/Search";

import "./Nav.css";

const Nav = () => {
  /* 登入狀態 */
  const isUserLoggedIn = useSelector((state) => state.login.isUserLoggedIn);
  const userInfo = useSelector((state) => state.login.userInfo);
  const dispatch = useDispatch();

  /* 搜索欄 */
  const [searchState, setSearchState] = useState(false);
  /* 搜索欄開關 */
  const openSearchHandler = () => {
    setSearchState((prev) => !prev);
  };

  /* 登出 */
  const logoutHandler = async () =>
    await axios
      .get(API_URL + "/login/logout", { withCredentials: true })
      .then((response) => {
        if (response.data.message === "登出成功") {
          dispatch(logout());
          alert(response.data.message);
        }
      })
      .catch((err) => {
        console.error("登出失敗:", err.response.data);
      });

  return (
    <React.Fragment>
      <div className="navBlock"></div>
      <header className="navHeader">
        <Link to="/" className="logo">
          <Image src="/images/UI/Nav/logo_text.svg" alt="logo" />
        </Link>
        <nav>
          <ul>
            <li>
              <Link to="/products">商品頁</Link>
            </li>
            <li>
              <Link to="/shoppingCart">購物車</Link>
            </li>
            <li>
              <Link to="/service">客服</Link>
            </li>
            <li>
              <Link to="/about">關於我們</Link>
            </li>
          </ul>
        </nav>
        <div className="tools">
          <div className="tool" title="商品搜尋" onClick={openSearchHandler}>
            <Image src="/images/UI/Nav/search.svg" alt="商品搜尋" />
          </div>
          <Link to="/user" className={`tool`} title="個人資訊">
            <Image src="/images/UI/Nav/userInfo.svg" alt="個人資訊" />
          </Link>
          {isUserLoggedIn ? (
            <div className="tool" title="登出" onClick={logoutHandler}>
              <img
                className="avatar"
                src={
                  userInfo.avatar
                    ? `${API_URL}/static${userInfo.avatar}`
                    : "/images/UI/User/avatar_default.jpg"
                }
                alt=""
              />
            </div>
          ) : (
            <Link to="/login" className="tool" title="前往登入頁面">
              <Image src="/images/UI/Nav/login.svg" alt="登入頁面" />
            </Link>
          )}
          {/* 搜尋畫面 */}
          {searchState ? (
            <Search
              onDialogClose={openSearchHandler}
              setSearchState={setSearchState}
            />
          ) : null}
        </div>
      </header>
    </React.Fragment>
  );
};

export default Nav;
