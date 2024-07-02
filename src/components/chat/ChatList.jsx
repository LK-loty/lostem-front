import { Link, useParams } from "react-router-dom";
import ChatItem from "./ChatItem";
import ImgLoty from "../../assets/images/img_loty.png";

const ChatList = ({ chatList }) => {
  const { roomId } = useParams();

  return (
    <div className="chatlist">
      <div className="logo">
        <Link to="/">
          <img className="logo" src={ImgLoty} />
        </Link>
      </div>
      <div className="chatlist-content">
        {chatList && chatList.length == 0 ? (
          <div className="no-chatlist">채팅목록이 없습니다</div>
        ) : (
          chatList.map((item, index) => (
            <ChatItem
              key={index}
              roomId={item.roomId}
              image={item.chatUserDTO.profile}
              tag={item.chatUserDTO.tag}
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
