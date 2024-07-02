import { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { readChatRoom, readMessages, createRoom } from "../../apis/chat";
import ChatMessage from "./ChatMessage";
import ReviewModal from "../common/Modal/ReviewModal";
import ChatReportModal from "../common/Modal/report/ChatReportModal";
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

  const currentUserTag = localStorage.getItem("tag");

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
  }, [roomId]);

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
        console.log("채팅방 정보 조회 =>", response.data);
        setPost(response.data.postInfoDTO);
        setUser(response.data.userInfoDTO);
        setRoom(response.data.roomInfoDTO);
      }
    } catch (error) {
      if (error.response.status === 404)
        navigate("/notfound", { replace: true });
    }
  };

  const fetchMessagesData = async (roomId) => {
    try {
      const response = await readMessages(roomId);

      if (response.status === 200) {
        setMessages(response.data);
      }
    } catch (error) {
      console.error("fetchMessagesData error: ", error);
    }
  };

  const onSubmit = (data) => {
    if (!roomId) {
      const firstMessage = {
        postId: post.postId,
        postType: post.postType,
        message: data.message,
      };
      console.log("first => ", firstMessage);
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
      {isChatReportModalOpen && (
        <ChatReportModal
          title={post.title}
          type={post.postType}
          postId={post.postId}
          tag={user.tag}
          onClose={() => setIsChatReportModalOpen(false)}
        />
      )}
      {roomId || location.state ? (
        <>
          {isReviewModalOpen && (
            <ReviewModal
              onClose={() => setIsReviewModalOpen(false)}
              postType={post.postType}
              postId={post.postId}
            />
          )}
          <div className="header">
            <div className="user-info">
              <div className="user-profile">
                <img className="profile_img" src={user.profile} />
                <span>
                  {user.nickname}
                  <span className="tag">#{user.tag}</span>
                </span>
              </div>
              <div className="dropdown">
                <button onClick={() => setIsDropOpen(!isDropOpen)}>
                  <PiDotsThreeVerticalBold size={24} />
                </button>
                {isDropOpen && (
                  <ul className="menu-list">
                    <li onClick={() => leaveChatRoom(roomId)}>채팅방 나가기</li>
                    <li onClick={() => setIsChatReportModalOpen(true)}>
                      신고하기
                    </li>
                  </ul>
                )}
              </div>
            </div>
            <hr />
            <div className="item-info">
              <div>
                <div className="item-image">
                  <Link
                    to={`${post.postType === "lost" ? "" : "/found"}/${
                      post.postId
                    }`}
                  >
                    <img src={post.image} />
                    <span>{post.title}</span>
                  </Link>
                </div>
                {localStorage.getItem("tag") === user.tag && (
                  <button className="fill-green-button">해결완료</button>
                )}
                {post.state === "해결완료" &&
                  post.traderTag &&
                  (post.traderTag === currentUserTag ||
                    post.traderTag === user.tag) && (
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
                placeholder={
                  room.levaeUserTag
                    ? "메시지를 입력해주세요"
                    : "상대방이 채팅방을 나갔습니다"
                }
                maxLength={1000}
                disabled={room.leaveUserTag}
              />

              <button type="submit" disabled={room.leaveUserTag}>
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
