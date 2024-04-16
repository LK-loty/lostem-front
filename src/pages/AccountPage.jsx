import { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { getUserProfile } from "../apis/user";
import sproutIco from "../assets/icons/ico_green-sprout.png";
import Tab from "../components/common/Tab";
import EditAccount from "../components/account/EditAccount";
import DeleteAccount from "../components/account/DeleteAccount";

const EditAccountPage = () => {
  const [userProfile, setUserProfile] = useState({});

  const tabs = [
    { title: "프로필 수정", url: "/account/edit" },
    { title: "탈퇴", url: "/account/delete" },
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
    <div className="edit-account-page">
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
          <Link to={"/mypage"} className="edit-account">
            마이페이지
          </Link>
        </div>
      </div>
      <div>
        <Tab tabs={tabs} />
        <div className="tab-contents">
          <Routes>
            <Route path="/edit" element={<EditAccount />} />
            <Route path="/delete" element={<DeleteAccount />} />
            <Route path="*" />
          </Routes>
        </div>
      </div>
    </div>
  );
};
export default EditAccountPage;
