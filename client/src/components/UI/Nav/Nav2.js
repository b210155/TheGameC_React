import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../redux/loginSlice";
import { API_URL } from "../../../constants";
import axios from "axios";

import Search from "../Search/Search";

import "./Nav2.css";

const Nav2 = () => {
  /* 登入狀態 */
  const isUserLoggedIn = useSelector((state) => state.login.isUserLoggedIn);
  const userInfo = useSelector((state) => state.login.userInfo);
  const dispatch = useDispatch();

  /* 搜索欄 */
  const [searchState, setSearchState] = useState(false);

  /* 螢幕寬度響應 */
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      {/* <div className="block"></div> */}
      <header className="Nav2">
        {windowWidth < 655 ? null : (
          <Link to="/" className="logo">
            <img src="/images/UI/Nav/logo_text.svg" alt="" />
          </Link>
        )}
        <nav>
          <ul>
            {windowWidth < 655 ? (
              <li>
                <Link to="/">首頁</Link>
              </li>
            ) : null}
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
            <img src="/images/UI/Nav/search.svg" alt="" />
          </div>
          <Link to="/user" className={`tool`} title="個人資訊">
            <img src="/images/UI/Nav/userInfo.svg" alt="" />
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
              <img src="/images/UI/Nav/login.svg" alt="" />
            </Link>
          )}

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

export default Nav2;
