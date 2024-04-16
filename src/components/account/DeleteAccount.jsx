import { useState } from "react";
import { deleteAccount } from "../../apis/user";

const DeleteAccount = () => {
  const [password, setPassword] = useState(""); // 비밀번호 상태

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await deleteAccount(password);
      if (response.status === 200) {
        console.log(response.data);
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
