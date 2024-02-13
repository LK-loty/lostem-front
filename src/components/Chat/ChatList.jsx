import { useState, useEffect } from "react";
import ChatItem from "./ChatItem";
import { readChatList } from "../../apis/chat";

const ChatList = () => {
  const [chatList, setChatList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await readChatList();

        if (response.status === 200) {
          setChatList(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("ChatList fetchData 에러", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="chatlist">
      {!loading && chatList.length === 0 ? (
        <div className="no-chatlist">채팅목록이 없습니다</div>
      ) : (
        chatList.map((item, index) => (
          <ChatItem
            key={index}
            roomId={item.roomId}
            image={item.image}
            nickname={item.nickname}
            time={item.time}
            message={item.message}
          />
        ))
      )}
    </div>
  );
};
export default ChatList;
