import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { BsFillSendFill } from "react-icons/bs";

const ChatRoom = () => {
  const { register, handleSubmit } = useForm();
  const { roomId } = useParams(); // 채팅방 아이디

  // roomId가 변경될때마다 해당 채팅방 데이터 가져오기
  useEffect(() => {}, [roomId]);

  return (
    <div className="chatroom">
      <div className="header">
        <div className="user-info">
          <img className="profile_img" />
          <span>상대닉네임</span>
        </div>
        <div className="item-info">
          <img />
          <div>
            <span>제목</span>
            <button>거래완료</button>
            {/* 후기 작성은 거래 완료 상태일 때만 활성화 */}
            <button>후기작성</button>
          </div>
        </div>
        <button>
          <PiDotsThreeVerticalBold size={24} />
        </button>
      </div>
      <div className="chat-messages"></div>
      <form className="message-input">
        <textarea
          type="text"
          placeholder="메시지를 입력해주세요"
          maxLength={1000}
        />
        <button type="button">
          <BsFillSendFill size={15} />
        </button>
      </form>
    </div>
  );
};
export default ChatRoom;
