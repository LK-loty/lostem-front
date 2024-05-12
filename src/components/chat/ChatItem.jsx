import { Link } from "react-router-dom";
import { formatRelativeDate } from "../../utils/date";

const ChatItem = ({
  roomId,
  image,
  nickname,
  tag,
  time,
  message,
  isCurrent,
}) => {
  return (
    <Link to={`/chat/${roomId}`}>
      <div className={`chat-item ${isCurrent ? "current-room" : ""}`}>
        <img src={image} className="profile-image" />
        <div className="chat-info">
          <div className="chat-title">
            <span className="nickname">
              {nickname}
              <span className="tag">#{tag}</span>
            </span>
            <span className="timestamp"> · {formatRelativeDate(time)}</span>
          </div>
          <span className="last-message">{message}</span>
        </div>
      </div>
    </Link>
  );
};
export default ChatItem;
