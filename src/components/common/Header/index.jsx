import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { PiBell } from "react-icons/pi";
import { PiNotePencilFill } from "react-icons/pi";
import "./style.scss";

const Header = () => {
  const [pageName, setPageName] = useState("주인을찾아요");
  const location = useLocation();

  useEffect(() => {
    setPageName(getPageNameFromPathname(location.pathname));
  }, [location]);

  const getPageNameFromPathname = (pathname) => {
    switch (pathname) {
      case "/post":
        return "글쓰기";
      case "/chat":
        return "채팅";
      case "/keyword":
        return "키워드알림";
      case "/myinfo":
        return "내정보";
      case "/search":
        return "검색";
      default:
        return "홈";
    }
  };

  return (
    <div className="header">
      <div className="pagetitle">{pageName}</div>
      <div className="btn-icon">
        <ul>
          <li>
            <FiSearch size={"36"} />
          </li>
          <li>
            <Link to="/post">
              <PiNotePencilFill size={"38"} />
            </Link>
          </li>
          <li>
            <Link to="/keyword">
              <PiBell size={"38"} />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Header;
