import { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { previewUser } from "../apis/user";
import sproutIco from "../assets/icons/ico_green-sprout.png";
import Tab from "../components/common/Tab";
import EditAccount from "../components/account/EditAccount";
import DeleteAccount from "../components/account/DeleteAccount";
import PasswordAccount from "../components/account/PasswordAccount";

const EditAccountPage = () => {
  const [userProfile, setUserProfile] = useState({});

  const tabs = [
    { title: "프로필 수정", url: "/account/profile" },
    { title: "비밀번호 변경", url: "/account/password" },
    { title: "탈퇴", url: "/account/delete" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const tag = localStorage.getItem("tag");
      try {
        const response = await previewUser(tag);

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
        <img src={userProfile.profile} />
        <div className="user-detail">
          <div className="user-nickname">
            {userProfile.nickname}
            <span className="tag">#{userProfile.tag}</span>
          </div>
          <div className="star-count">
            <img src={sproutIco} /> {userProfile.star}
          </div>
          <Link to={"/mypage/lost"} className="edit-account">
            마이페이지
          </Link>
        </div>
      </div>
      <div>
        <Tab tabs={tabs} />
        <div className="tab-contents">
          <Routes>
            <Route path="/profile" element={<EditAccount />} />
            <Route path="/delete" element={<DeleteAccount />} />
            <Route path="/password" element={<PasswordAccount />} />
            <Route path="*" element={<></>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
export default EditAccountPage;
