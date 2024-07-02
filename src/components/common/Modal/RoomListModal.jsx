import { useState, useEffect } from "react";
import { readMyChatList } from "../../../apis/chat";
import ChatItem from "../../chat/ChatItem";

const RoomListModal = ({ onClose, postId, type }) => {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = { postId: postId, postType: type };
        const response = await readMyChatList(data);
        setChatList(response.data);
        console.log(response);
      } catch (error) {
        console.error("내 채팅방 목록 가져오기 에러 ", error);
      }
    };

    fetchData();
  }, [postId]);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <p className="modal-title">채팅 목록</p>
          {chatList && (
            <ul>
              {chatList.map((item, index) => (
                <ChatItem
                  key={index}
                  roomId={item.roomId}
                  image={item.chatUserDTO.profile}
                  tag={item.chatUserDTO.tag}
                  nickname={item.chatUserDTO.nickname}
                  time={item.chatMessageDTO.time}
                  message={item.chatMessageDTO.message}
                />
              ))}
            </ul>
          )}
          <div className="modal-button">
            <button name="button" className="button-close" onClick={onClose}>
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RoomListModal;
