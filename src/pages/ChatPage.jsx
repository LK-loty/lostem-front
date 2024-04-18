import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { readChatList } from "../apis/chat";
import { checkAccessToken } from "../utils/auth";
import ChatList from "../components/chat/ChatList";
import ChatRoom from "../components/chat/ChatRoom";
import { useNavigate, useParams } from "react-router-dom";

const ChatPage = () => {
  const [newMessage, setNewMessage] = useState();
  const [chatList, setChatList] = useState([]);
  const stompClientRef = useRef(null);
  const subRoomRef = useRef(null);

  const { roomId } = useParams();

  const navigate = useNavigate();

  const initializeChat = async () => {
    try {
      const response = await readChatList();

      if (response.status === 200) {
        console.log("서버에서 받아온 chatList : ", response.data);
        setChatList(response.data);
        connectWebSocket(response.data);
      }
    } catch (error) {
      console.log("채팅 목록 가져오기 에러 => ", error);
    }
  };

  const connectWebSocket = () => {
    const accessToken = localStorage.getItem("act");
    const tag = localStorage.getItem("tag");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const socketEndpoint = "http://localhost:8080/api/websocket";
    const stompClient = Stomp.over(() => new SockJS(socketEndpoint));

    // 웹소켓 연결
    stompClient.connect(
      headers,
      () => {
        // 연결 성공 후 구독 설정
        stompClient.subscribe(`/sub/chat/list/${tag}`, onListMessageReceived);
        if (roomId) subscribeRoom(roomId);
      },
      (error) => {
        console.log("error ", error);
      }
    );

    stompClient.debug = (str) => {
      console.log("debug: ", str);
    };

    stompClientRef.current = stompClient;
  };

  useEffect(() => {
    checkAccessToken();
    initializeChat();

    // 언마운트될 때 연결 해제
    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.disconnect();
      }
    };
  }, []);

  // 채팅 방 생성 후 enter 메시지 전송
  const sendEnterMessage = (roomId) => {
    const token = localStorage.getItem("act");
    const headers = {
      Authorization: `${token}`,
    };

    const data = { roomId: roomId };

    stompClientRef.current.send(
      "/pub/chat/enter",
      headers,
      JSON.stringify(data)
    );
  };

  // 첫 메시지 이후 메시지 전송
  const sendMessageLater = (message) => {
    const token = localStorage.getItem("act");
    const headers = {
      Authorization: `${token}`,
    };
    stompClientRef.current.send(
      "/pub/chat/message/create",
      headers,
      JSON.stringify(message)
    );
  };

  // 채팅방 구독
  const subscribeRoom = (roomId) => {
    if (stompClientRef.current) {
      const subscription = stompClientRef.current.subscribe(
        `/sub/chat/room/${roomId}`,
        onMessageReceived
      );
      subRoomRef.current = subscription;

      // console.log("채팅 방 구독", subRoomRef.current);
    }
  };

  // 채팅방 구독 해제
  const unsubscribeRoom = () => {
    if (subRoomRef.current) {
      // console.log(subRoomRef.current, "구독 해제");
      subRoomRef.current.unsubscribe();
      subRoomRef.current = null;
    }
  };

  // 채팅방 나가기
  const leaveChatRoom = (roomId) => {
    const token = localStorage.getItem("act");
    const headers = {
      Authorization: `${token}`,
    };

    const data = { roomId: roomId };

    if (stompClientRef.current) {
      stompClientRef.current.send(
        "/pub/chat/leave",
        headers,
        JSON.stringify(data)
      );
    }
  };

  // 채팅 메시지 수신 처리
  const onMessageReceived = (message) => {
    const newMessage = JSON.parse(message.body);
    setNewMessage(newMessage);
    console.log("new message received !!!!!!!!!!!!!!! ", newMessage);
  };

  const onListMessageReceived = (message) => {
    const newListMessage = JSON.parse(message.body);
    console.log(newListMessage);

    if (newListMessage.messageType === "ENTER") {
      // ENTER 처리
      setChatList((prevList) => [newListMessage, ...prevList]);
    } else if (newListMessage.messageType === "LEAVE") {
      // LEAVE 처리
      setChatList((prevList) =>
        prevList.filter((item) => item.roomId !== newListMessage.roomId)
      );
      navigate("/chat", { replace: true });
    } else if (newListMessage.messageType === "TALK") {
      // TALK 처리
      setChatList((prevList) => {
        const updatedList = prevList.map((item) => {
          if (item.roomId === newListMessage.roomId) {
            // 해당하는 roomId를 가진 아이템을 찾아서 message를 업데이트
            return {
              ...item,
              chatMessageDTO: {
                ...item.chatMessageDTO,
                message: newListMessage.message,
                time: newListMessage.time,
              },
            };
          }
          return item;
        });

        // 해당 메시지를 배열의 맨 앞으로 이동
        const index = updatedList.findIndex(
          (item) => item.roomId === newListMessage.roomId
        );
        if (index !== -1) {
          const movedItem = updatedList.splice(index, 1)[0];
          updatedList.unshift(movedItem);
        }

        return updatedList;
      });
    }
  };

  return (
    <div className="chatpage">
      <ChatList chatList={chatList} />
      <ChatRoom
        sendEnterMessage={sendEnterMessage}
        leaveChatRoom={leaveChatRoom}
        sendMessageLater={sendMessageLater}
        subscribeRoom={subscribeRoom}
        unsubscribeRoom={unsubscribeRoom}
        newMessage={newMessage}
      />
    </div>
  );
};
export default ChatPage;
