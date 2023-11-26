import { useParams } from "react-router-dom";
import "./Chat.css";
import { Message, useChatHistory } from "./useChatHistory";
import { useRef } from "react";
import { userDetailsFromStorage } from "../getFromStorage";
import useAddMessage from "./useAddMessage";

function Chat() {
  const userId = useParams<{ id: string }>();
  const ref = useRef<HTMLTextAreaElement>(null);
  const user = userDetailsFromStorage();
  const {
    data: chatHistory,
    isLoading,
    isError,
  } = useChatHistory(userId.id ? userId.id : "");
  const addMessage = useAddMessage(() => {
    if (ref.current) ref.current.value = "";
  });

  console.log(`Singed in User: ${user.username}`);

  if (isError) return <div>{isError}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {addMessage.error && <div>{addMessage.error.message}</div>}
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
            <form
              className="message-form"
              onSubmit={(event) => {
                event.preventDefault();
                if (ref.current && ref.current.value)
                  addMessage.mutate({
                    content: ref?.current.value,
                  });
              }}
            >
              <textarea
                ref={ref}
                placeholder="message"
                title="message"
                cols={30}
                name="message"
                id="message"
                required
              />
              <button className="send-button" type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
