import React, { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import ChatList from "../components/Chat/ChatList";
import ChatRoom from "../components/Chat/ChatRoom";

const ChatPage = () => {
  const stompClientRef = useRef(null);
  useEffect(() => {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const socketEndpoint = "http://localhost:8080/api/websocket";

    const socket = new SockJS(socketEndpoint);
    const stompClient = Stomp.over(socket);

    stompClient.connect(
      headers,
      (frame) => {
        console.log("connected ", frame);
      },
      (error) => {
        console.log("error ", error);
      }
    );

    stompClient.debug = (str) => {
      console.log("debug: ", str);
    };

    stompClientRef.current = stompClient;

    // 언마운트될 때 연결 해제
    return () => {
      stompClientRef.current.disconnect();
    };
  }, []);

  return (
    <div className="chatpage">
      <ChatList stompClient={stompClientRef.current} />
      <ChatRoom stompClient={stompClientRef.current} />
    </div>
  );
};

export default ChatPage;
