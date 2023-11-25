// import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import "./Chat.css";
import { Message, useChatHistory } from "./useChatHistory";
// const socket = io.connect("http://localhost:3000");

function Chat() {
  const userId = useParams<{ id: string }>();

  const {
    data: chatHistory,
    isLoading,
    isError,
  } = useChatHistory(userId.id ? userId.id : "");

  if (isError) return <div>{isError}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="chat-container">
      <div className="chat-content">
        {chatHistory?.map((message: Message, index: number) => (
          <div key={index} className="messages">
            {`${userId.id}` == message.author._id ? (
              <div className="recipient">{message.content}</div>
            ) : (
              <div className="author">{message.content}</div>
            )}
          </div>
        ))}
        <div className="message-input">
          <form className="message-form" action="">
            <textarea
              placeholder="message"
              title="message"
              cols={70}
              name="message"
              id="message"
            />
            <button className="send-button" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
