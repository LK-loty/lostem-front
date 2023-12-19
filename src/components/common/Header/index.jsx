import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { PiChatsCircle } from "react-icons/pi";
import { GoPerson } from "react-icons/go";
import { PiBell } from "react-icons/pi";
import ImgLoty from "../../../assets/images/img_loty.png";

const Header = () => {
  const [nav, setNav] = useState(false);

  const navItems = [
    { name: "잃어버렸어요", link: "/" },
    { name: "주인을찾아요", link: "/findowner" },
  ];

  return (
    <div className="main-header-wrap">
      <header className="main-header">
        <div className={"dark-overlay" + (nav ? " visible" : "")}></div>
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
                    <Link className="nav_item hoverGreen" to={nav.link}>
                      {nav.name}
                    </Link>
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
              <Link to="/search" className="hoverGreen">
                <IoIosSearch size={26} />
              </Link>
            </li>
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
            <li>
              <Link to="/login" className="green">
                <GoPerson size={26} />
              </Link>
            </li>
          </ul>
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
        </div>
      </header>
    </div>
  );
};
export default Header;
