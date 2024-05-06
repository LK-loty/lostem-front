import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { PiChatsCircle } from "react-icons/pi";
import { GoPerson } from "react-icons/go";
import { PiBell } from "react-icons/pi";
import { isLogin } from "../../../utils/auth";
import { previewUser } from "../../../apis/user";
import { logout } from "../../../apis/auth";
import Profile from "../Profile";
import ImgLoty from "../../../assets/images/img_loty.png";

const Header = () => {
  const [nav, setNav] = useState(false);
  const [profile, setProfile] = useState("");
  const [loginState, setLoginState] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // 드롭다운 메뉴 상태 추가

  const navigate = useNavigate();

  const navItems = [
    { name: "잃어버렸어요", link: "/" },
    { name: "주인을찾아요", link: "/found" },
  ];

  useEffect(() => {
    const isLoggedIn = isLogin();
    setLoginState(isLoggedIn);
  }, []);

  useEffect(() => {
    const tag = localStorage.getItem("tag");
    const fetchUserInfo = async () => {
      try {
        const response = await previewUser(tag);
        if (response.status === 200) setProfile(response.data.profile);
      } catch (error) {
        console.error("header 유저 프로필 에러:", error);
      }
    };

    if (loginState) {
      fetchUserInfo();
    }
  }, [loginState]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await logout(); // 로그아웃 요청
      if (response.status === 200) {
        // 성공 시 로컬 스토리지 비우고 메인 페이지로 이동
        localStorage.removeItem("act");
        localStorage.removeItem("tag");
        navigate("/");
      } else {
        console.error("로그아웃 실패:", response.data.message);
      }
    } catch (error) {
      console.error("로그아웃 에러:", error);
    }
  };

  return (
    <div className="main-header-wrap">
      <header className="main-header">
        <div
          className={"dark-overlay" + (nav ? " visible" : "")}
          onClick={() => setNav(false)}
        ></div>
        <nav className="main-nav">
          <div className="menu-button-wrap">
            <label htmlFor="menu-button" className="menu-container">
              <input
                type="checkbox"
                id="menu-button"
                checked={nav}
                onChange={(event) => setNav(event.target.checked)}
              />
              <span></span>
              <span></span>
              <span></span>
            </label>
          </div>
          <div className={"main-wrap" + (nav ? " nav-open" : "")}>
            <ul className="main-list">
              {navItems.map((nav) => {
                return (
                  <li key={nav.name}>
                    <NavLink
                      className={({ isActive }) =>
                        "nav_item hoverGreen " + (isActive ? "green" : "")
                      }
                      to={nav.link}
                      onClick={() => setNav(false)}
                    >
                      {nav.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
        <div className="main-logo">
          <Link to="/">
            <img src={ImgLoty} alt="로스템" />
          </Link>
        </div>
        <div className="main-dynamic">
          <ul className="icon-list">
            <li>
              <Link to="/chat" className="hoverGreen">
                <PiChatsCircle size={26} />
              </Link>
            </li>
            <li>
              <Link to="/keyword" className="hoverGreen">
                <PiBell size={26} />
              </Link>
            </li>
            {!loginState && (
              <li className="icon-person">
                <Link to="/login" className="green">
                  <GoPerson size={26} />
                </Link>
              </li>
            )}
            {loginState && (
              <li className="icon-profile">
                <div onClick={toggleDropdown}>
                  <Profile size={40} imageUrl={profile} />
                </div>
                {dropdownOpen && (
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/mypage">마이페이지</Link>
                    </li>
                    <li>
                      <button onClick={handleLogout}>로그아웃</button>
                    </li>
                  </ul>
                )}
              </li>
            )}
          </ul>
          {!loginState && (
            <ul className="auth-list">
              <li>
                <Link to="/login" className="hoverGreen">
                  로그인
                </Link>
              </li>
              <li>
                <Link to="/signup" className="green">
                  회원가입
                </Link>
              </li>
            </ul>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
