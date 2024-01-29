import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { BsFillSendFill } from "react-icons/bs";

const ChatRoom = () => {
  const { register, handleSubmit } = useForm();
  const { roomId } = useParams(); // 채팅방 아이디

  const [isDropOpen, setIsDropOpen] = useState(false);

  // roomId가 변경될때마다 해당 채팅방 데이터 가져오기
  useEffect(() => {}, [roomId]);

  return (
    <div className="chatroom">
      <div className="header">
        <div className="user-info">
          <div>
            <img className="profile_img" />
            <span>상대닉네임</span>
          </div>
          <div className="dropdown">
            <button onClick={() => setIsDropOpen(!isDropOpen)}>
              <PiDotsThreeVerticalBold size={24} />
            </button>
            {isDropOpen && (
              <ul className="menu-list">
                <li>채팅방 나가기</li>
                <li>신고하기</li>
              </ul>
            )}
          </div>
        </div>
        <hr />
        <div className="item-info">
          <div>
            <div>
              <img />
              <span>제목</span>
            </div>
            <button className="fill-green-button">거래완료</button>
            {/* 후기 작성은 거래 완료 상태일 때만 활성화 */}
            <button className="fill-green-button">후기작성</button>
          </div>
        </div>
      </div>
      <div className="chat-messages"></div>
      <form className="message-input">
        <textarea
          type="text"
          placeholder="메시지를 입력해주세요"
          maxLength={1000}
        />
        <button type="button">
          <BsFillSendFill size={14} />
        </button>
      </form>
    </div>
  );
};
export default ChatRoom;
