import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../../apis/user";

const DeleteAccount = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState(""); // 비밀번호 상태

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await deleteAccount(password);
      if (response.status === 200) {
        localStorage.clear();
        navigate("/");
      }
    } catch (error) {
      console.error("계정 삭제 중 에러:", error);
    }
  };

  return (
    <div>
      <div className="account-form">
        비밀번호
        <input
          type="password"
          value={password}
          onChange={handleChangePassword}
        />
        <button className="auth-button" onClick={handleDeleteAccount}>
          탈퇴하기
        </button>
      </div>
    </div>
  );
};

export default DeleteAccount;
