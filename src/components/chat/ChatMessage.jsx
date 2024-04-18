import React from "react";
import { formatDate } from "../../utils/date";

const ChatMessage = React.memo(({ message, time, sender }) => {
  const isMyMessage = sender === localStorage.getItem("tag");
  const formattedTime = time ? formatDate(time) : "";

  return (
    <div className={isMyMessage ? "my-message" : "other-message"}>
      {isMyMessage ? (
        <>
          {time && <span className="message-time">{formattedTime}</span>}
          <p>{message}</p>
        </>
      ) : (
        <>
          <p>{message}</p>
          {time && <span className="message-time">{formattedTime}</span>}
        </>
      )}
    </div>
  );
});

export default ChatMessage;
