import { Link } from "react-router-dom";

const ChatItem = ({ roomId, image, nickname, time, message }) => {
  return (
    <Link to={`/chat/${roomId}`}>
      <div className="chat-item">
        <img src={image} className="profile-image" />
        <div className="chat-info">
          <div className="chat-title">
            <span className="nickname">{nickname}</span>
            <span className="timestamp"> · {time}</span>
          </div>
          <span className="last-message">{message}</span>
        </div>
      </div>
    </Link>
  );
};
export default ChatItem;
