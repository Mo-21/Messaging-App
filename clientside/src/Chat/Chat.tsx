// import { io } from "socket.io-client";
import "./Chat.css";
import { Message, useChatHistory } from "./useChatHistory";

// const socket = io.connect("http://localhost:3000");

function Chat() {
  //To be extracted from the URL and used to fetch the chat history later on
  //   const userId = useParams();

  const userId: string = "655bb4f4d6dc9df561758c33";
  const { data: chatHistory, isLoading, isError } = useChatHistory(userId);

  if (isError) return <div>{isError}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="chat-container">
      <div className="recipient-info">
        <div className="user-photo">user-photo</div>
        <div className="user-name">Wizard</div>
      </div>
      <div className="chat-content">
        {chatHistory?.map((message: Message, index: number) => (
          <div key={index} className="messages">
            {`${userId}` == message.author ? (
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
