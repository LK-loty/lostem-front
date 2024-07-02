import { useState, useEffect } from "react";
import { readChatMembers } from "../../../apis/chat";
import { updatePostState } from "../../../apis/post";

const UserSelectionModal = ({ postId, onClose, type }) => {
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // 선택된 사용자 정보를 저장할 상태

  useEffect(() => {
    const fetchChatMembers = async () => {
      try {
        const response = await readChatMembers(postId, type);
        if (response.status === 200) setUserList(response.data);
      } catch (error) {
        console.error("채팅 참가자 리스트 불러오기 오류", error);
      }
    };

    fetchChatMembers();
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user); // 사용자 선택 상태 업데이트
  };

  const handleConfirm = async () => {
    if (selectedUser) {
      const data = {
        postId: postId,
        state: "해결완료",
        traderTag: selectedUser.tag,
      };
      const response = await updatePostState(data, type);
      if (response.status === 200) {
        window.location.reload();
      }
    } else onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <p className="modal-title">해결완료 대상자를 골라주세요</p>
          {userList && (
            <ul>
              {userList.map((user) => (
                <li
                  key={user.tag}
                  onClick={() => handleSelectUser(user)}
                  className={selectedUser === user ? "selected" : ""}
                >
                  {user.nickname}#{user.tag}
                </li>
              ))}
            </ul>
          )}
          <div className="modal-button">
            <button name="button" className="button-close" onClick={onClose}>
              취소
            </button>
            <button
              name="button"
              className="confirm-button"
              onClick={handleConfirm}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSelectionModal;
