import { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { readChatRoom, readMessages, createRoom } from "../../apis/chat";
import ChatMessage from "./ChatMessage";
import ReviewModal from "../common/Modal/ReviewModal";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { BsFillSendFill } from "react-icons/bs";

const ChatRoom = ({
  leaveChatRoom,
  sendMessageLater,
  sendEnterMessage,
  newMessage,
  subscribeRoom,
  unsubscribeRoom,
}) => {
  const navigate = useNavigate();
  const scrollRef = useRef();

  const { register, handleSubmit, reset } = useForm();

  const { roomId } = useParams();
  const location = useLocation();

  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const [room, setRoom] = useState({});
  const [messages, setMessages] = useState([]);

  const [isDropOpen, setIsDropOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isChatReportModalOpen, setIsChatReportModalOpen] = useState(false);

  // roomId가 변경될때마다 해당 채팅방 데이터 가져오기
  useEffect(() => {
    // console.log("ChatRoom Component rommId : ", roomId);
    if (!roomId) {
      if (location.state) {
        // 채팅방 상단 데이터 설정
        setUser(location.state.userInfo);
        setPost(location.state.postInfo);
      }
    } else {
      fetchChatRoomData(roomId); // 채팅방 상단 정보(대화상대+post)
      fetchMessagesData(roomId); // 해당 채팅방의 기존 메시지
      subscribeRoom(roomId);
    }

    return () => {
      unsubscribeRoom();
    };
  }, [roomId, subscribeRoom, unsubscribeRoom, location.state]);

  useEffect(() => {
    if (newMessage) setMessages((messages) => [...messages, newMessage]);
  }, [newMessage]);

  // 스크롤 최하단 고정
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchChatRoomData = async (roomId) => {
    try {
      const response = await readChatRoom(roomId);

      if (response.status === 200) {
        console.log(response.data);
        setPost(response.data.postInfoDTO);
        setUser(response.data.userInfoDTO);
        setRoom(response.data.roomInfoDTO);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMessagesData = async (roomId) => {
    try {
      const response = await readMessages(roomId);

      if (response.status === 200) {
        console.log("fetch messages data : ", response.data);
        setMessages(response.data);
      }
    } catch (error) {
      console.error("fetchMessagesData error: ", error);
    }
  };

  // 채팅방 생성됐을 때
  // location.state 값에 담긴 정보로 상단 바 내용 출력

  const onSubmit = (data) => {
    if (!roomId) {
      const firstMessage = {
        postId: post.postId,
        postType: post.postType,
        message: data.message,
      };
      createRoom(firstMessage)
        .then((response) => {
          if (response.status === 200) {
            sendEnterMessage(response.data.roomId);
            navigate(`/chat/${response.data.roomId}`, { replace: true });
          }
        })
        .catch((error) => console.error("sendEnterMessage 오류", error));
      reset();
    } else {
      const laterMessage = {
        type: "TALK",
        roomId: roomId,
        message: data.message,
      };
      sendMessageLater(laterMessage);

      reset();
    }
  };

  return (
    <div className="chatroom">
      {roomId || location.state ? (
        <>
          {isReviewModalOpen && (
            <ReviewModal
              onClose={() => setIsReviewModalOpen(false)}
              postType={post.postType}
              postId={post.postId}
              tag={
                localStorage.getItem("tag") === room.hostUserTag ? user.tag : ""
              }
            />
          )}
          <div className="header">
            <div className="user-info">
              <div>
                <img className="profile_img" />
                {user.nickname}
                <span className="tag">#{user.tag}</span>
              </div>
              <div className="dropdown">
                <button onClick={() => setIsDropOpen(!isDropOpen)}>
                  <PiDotsThreeVerticalBold size={24} />
                </button>
                {isDropOpen && (
                  <ul className="menu-list">
                    <li>
                      <button onClick={() => leaveChatRoom(roomId)}>
                        채팅방 나가기
                      </button>
                    </li>
                    <li>
                      <button onClick={() => setIsChatReportModalOpen(true)}>
                        신고하기
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>
            <hr />
            <div className="item-info">
              <div>
                <div>
                  <img />
                  <span>{post.title}</span>
                </div>
                {localStorage.getItem("tag") === user.tag && (
                  <button className="fill-green-button">거래완료</button>
                )}
                {/* 후기 작성은 거래 완료 상태일 때만 활성화 */}
                {post.state === "해결완료" && (
                  <button
                    className="outline-green-button"
                    onClick={() => setIsReviewModalOpen(true)}
                  >
                    후기작성
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="chat-messages" ref={scrollRef}>
            {messages &&
              messages.length !== 0 &&
              messages.map((msg, index) => (
                <ChatMessage
                  key={index}
                  message={msg.message}
                  sender={msg.senderTag}
                  time={msg.time}
                />
              ))}
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="message-input">
              <textarea
                {...register("message", {
                  required: true,
                  maxLength: 1000,
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
        </>
      ) : (
        <div className="no-chatlist">선택된 채팅방이 없습니다</div>
      )}
    </div>
  );
};
export default ChatRoom;
