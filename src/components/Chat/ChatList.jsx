import { useState, useEffect } from "react";
import ChatItem from "./ChatItem";
import { readChatList } from "../../apis/chat";

const ChatList = () => {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await readChatList();

    //     if (response.status === 200) {
    //       setChatList(response.data);
    //     }
    //   } catch (error) {
    //     console.error("ChatList fetchData 에러", error);
    //   }
    // };

    // fetchData();
    setChatList([
      {
        roomId: "1",
        image: "/image/민증.jpg",
        nickname: "User1",
        time: "1시간 전",
        message: "안녕하세요!",
      },
      {
        roomId: "2",
        image: "/image/이지원.jpg",
        nickname: "User2",
        time: "2시간 전",
        message: "반갑습니다!",
      },
      {
        roomId: "2",
        image: "/image/이지원.jpg",
        nickname: "User2",
        time: "2시간 전",
        message: "반갑습니다!",
      },
      {
        roomId: "2",
        image: "/image/이지원.jpg",
        nickname: "User2",
        time: "2시간 전",
        message: "반갑습니다!",
      },
      {
        roomId: "2",
        image: "/image/이지원.jpg",
        nickname: "User2",
        time: "2시간 전",
        message: "반갑습니다!",
      },
      {
        roomId: "2",
        image: "/image/이지원.jpg",
        nickname: "User2",
        time: "2시간 전",
        message: "반갑습니다!",
      },
      {
        roomId: "2",
        image: "/image/이지원.jpg",
        nickname: "User2",
        time: "2시간 전",
        message: "반갑습니다!",
      },
      {
        roomId: "2",
        image: "/image/이지원.jpg",
        nickname: "User2",
        time: "2시간 전",
        message: "반갑습니다!",
      },
      {
        roomId: "2",
        image: "/image/이지원.jpg",
        nickname: "User2",
        time: "2시간 전",
        message: "반갑습니다!",
      },
      {
        roomId: "2",
        image: "/image/이지원.jpg",
        nickname: "User2",
        time: "2시간 전",
        message: "반갑습니다!",
      },
      {
        roomId: "2",
        image: "/image/이지원.jpg",
        nickname: "User2",
        time: "2시간 전",
        message: "반갑습니다!",
      },
      {
        roomId: "2",
        image: "/image/이지원.jpg",
        nickname: "User2",
        time: "2시간 전",
        message: "반갑습니다!",
      },
      {
        roomId: "2",
        image: "/image/이지원.jpg",
        nickname: "User2",
        time: "2시간 전",
        message: "반갑습니다!",
      },
      {
        roomId: "2",
        image: "/image/이지원.jpg",
        nickname: "User2",
        time: "2시간 전",
        message: "반갑습니다!",
      },
      {
        roomId: "2",
        image: "/image/이지원.jpg",
        nickname: "User2",
        time: "2시간 전",
        message: "반갑습니다!",
      },
      {
        roomId: "2",
        image: "/image/이지원.jpg",
        nickname: "User2",
        time: "2시간 전",
        message: "반갑습니다!",
      },
      {
        roomId: "2",
        image: "/image/이지원.jpg",
        nickname: "User2",
        time: "2시간 전",
        message: "반갑습니다!",
      },
      {
        roomId: "2",
        image: "/image/이지원.jpg",
        nickname: "User2",
        time: "2시간 전",
        message: "반갑습니다!",
      },
      {
        roomId: "2",
        image: "/image/이지원.jpg",
        nickname: "User2",
        time: "2시간 전",
        message: "반갑습니다!",
      },
      {
        roomId: "2",
        image: "/image/이지원.jpg",
        nickname: "User2",
        time: "2시간 전",
        message: "반갑습니다!",
      },
      {
        roomId: "2",
        image: "/image/이지원.jpg",
        nickname: "User2",
        time: "2시간 전",
        message: "반갑습니다!",
      },
      {
        roomId: "2",
        image: "/image/이지원.jpg",
        nickname: "User2",
        time: "2시간 전",
        message: "반갑습니다!",
      },
    ]);
  }, []);

  return (
    <div className="chatlist">
      {chatList.map((item, index) => (
        <ChatItem
          key={index}
          roomId={item.roomId}
          image={item.image}
          nickname={item.nickname}
          time={item.time}
          message={item.message}
        />
      ))}
    </div>
  );
};
export default ChatList;
