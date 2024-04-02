import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ChatItem from "./ChatItem";
import { readChatList } from "../../apis/chat";
import ImgLoty from "../../assets/images/img_loty.png";

// 최근 (메시지 + 시간)
// 채팅방 생성 시 리스트 갱신
const ChatList = ({ chatList }) => {
  const { roomId } = useParams();

  return (
    <div className="chatlist">
      <div className="logo">
        <Link to="/">
          <img className="logo" src={ImgLoty} />
        </Link>
      </div>
      <div>
        {chatList && chatList.length == 0 ? (
          <div className="no-chatlist">채팅목록이 없습니다</div>
        ) : (
          chatList.map((item, index) => (
            <ChatItem
              key={index}
              roomId={item.roomId}
              image={""}
              nickname={item.chatUserDTO.nickname}
              time={item.chatMessageDTO.time}
              message={item.chatMessageDTO.message}
              isCurrent={roomId == item.roomId}
            />
          ))
        )}
      </div>
    </div>
  );
};
export default ChatList;
