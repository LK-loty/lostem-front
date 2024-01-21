const ChatMessage = React.memo(({ message, isMyMessage }) => {
  return (
    <div className={isMyMessage ? "my-message" : "other-message"}>
      <p>{message}</p>
    </div>
  );
});

export default ChatMessage;
