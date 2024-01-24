import React from "react";

const ChatMessage = React.memo(({ message, isMyMessage, avatar, time }) => {
  return (
    <div className={isMyMessage ? "my-message" : "other-message"}>
      {isMyMessage ? (
        <>
          {time && <span className="message-time">{time}</span>}
          <p>{message}</p>
        </>
      ) : (
        <>
          <img src={avatar} alt="Profile" className="profile-image" />
          <p>{message}</p>
          {time && <span className="message-time">{time}</span>}
        </>
      )}
    </div>
  );
});

export default ChatMessage;
