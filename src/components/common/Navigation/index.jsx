import React from "react";
import { Link } from "react-router-dom";
import ImgLoty from "../../../assets/images/img_loty.png";
import ImgSprout from "../../../assets/images/img_sprout.png";
import "./style.scss";

const navItems = [
  { id: 1, name: "홈", link: "/" },
  { id: 2, name: "검색", link: "/search" },
  { id: 3, name: "글쓰기", link: "/post" },
  { id: 4, name: "채팅", link: "/chat" },
  { id: 5, name: "키워드알림", link: "/keyword" },
  { id: 6, name: "내정보", link: "/myinfo" },
];

const Navigation = () => {
  return (
    <div className="navigation">
      <img className="logo" src={ImgLoty} alt="loty" />
      <div className="auth">
        <Link className="btn-login" to="/login">
          로그인
        </Link>
        <Link className="btn-signup" to={"/signup"}>
          회원가입
        </Link>
      </div>
      <ul>
        {navItems.map((nav) => {
          return (
            <li key={nav.id}>
              <Link className="navigation-menu" to={nav.link}>
                <img className="imgsprout" src={ImgSprout} alt="sprout" />
                {nav.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Navigation;
