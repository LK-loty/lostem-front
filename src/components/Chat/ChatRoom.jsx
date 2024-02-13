import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { readChatRoom, readMessages } from "../../apis/chat";
import ChatMessage from "./ChatMessage";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { BsFillSendFill } from "react-icons/bs";

const ChatRoom = ({ stompClient }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { roomId } = useParams(); // 채팅방 아이디
  const [isDropOpen, setIsDropOpen] = useState(false);
  const location = useLocation();

  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const [messages, setMessages] = useState([]);

  // roomId가 변경될때마다 해당 채팅방 데이터 가져오기
  useEffect(() => {
    if (location.state) {
      // 게시글의 채팅하기 버튼 눌렀을 때

      // 채팅방 상단 데이터 설정
      setUser(location.state.userInfo);
      setPost(location.state.postInfo);
    } else {
      // 게시글을 통하지 않고 채팅 페이지로 바로 이동했을 때

      // 서버에 요청
      // 채팅방 상단 데이터

      // 채팅 메시지 리스트 - roomId가 있는 경우
      setUser({});
    }
  }, [roomId]);

  const onSubmit = (data) => {
    const messageToSend = {
      roomId: roomId,
      content: data.message,
      senderId: "본인 아이디",
    };
    console.log(messageToSend);
    reset();
  };

  return (
    <div className="chatroom">
      <div className="header">
        <div className="user-info">
          <div>
            <img className="profile_img" />
            {user.nickname} <span className="tag">#{user.tag}</span>
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="message-input">
          <textarea
            {...register("message", {
              required: "메시지를 입력해주세요",
              maxLength: {
                value: 1000,
                message: "1000자 이내로 입력해야 합니다",
              },
            })}
            type="text"
            placeholder="메시지를 입력해주세요"
            maxLength={1000}
          />

          <button type="submit">
            <BsFillSendFill size={14} />
          </button>
        </div>
      </form>
    </div>
  );
};
export default ChatRoom;
