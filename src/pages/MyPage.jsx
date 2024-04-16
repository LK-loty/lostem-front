import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import LostList from "../components/user/LostList";
import FoundList from "../components/user/FoundList";
import KeywordList from "../components/user/KeywordList";
import ReviewList from "../components/user/ReviewList";
import { getUserProfile } from "../apis/user";
import sproutIco from "../assets/icons/ico_green-sprout.png";
import Tab from "../components/common/Tab";

const MyPage = () => {
  const [userProfile, setUserProfile] = useState({});

  const tabs = [
    { title: "잃어버렸어요", url: "/mypage/lost" },
    { title: "주인을찾아요", url: "/mypage/found" },
    { title: "후기", url: "/mypage/review" },
    { title: "키워드", url: "/mypage/keyword" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const tag = localStorage.getItem("tag");
      try {
        const response = await getUserProfile(tag);
        if (response.status === 200) {
          setUserProfile(response.data);
        }
      } catch (error) {
        console.error("mypage fetchdata 에러 => ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mypage">
      <div className="user-profile">
        <img />
        <div className="user-detail">
          <div className="user-nickname">
            {userProfile.nickname}
            <span className="tag">#{userProfile.tag}</span>
          </div>
          <div className="star-count">
            <img src={sproutIco} /> {userProfile.starCount}
          </div>
          <Link to={"/account/edit"} className="edit-account">
            회원정보 수정
          </Link>
        </div>
      </div>
      <div>
        <Tab tabs={tabs} />
        <div className="tab-contents">
          <Routes>
            <Route path="/lost" element={<LostList />} />
            <Route path="/found" element={<FoundList />} />
            <Route path="/review" element={<ReviewList />} />
            <Route path="/keyword" element={<KeywordList />} />
            <Route path="/*" element={<></>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
export default MyPage;
