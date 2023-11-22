/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useState } from "react";
import "./Chat.css";
import { useParams } from "react-router-dom";

export default function Chat() {
  const [content, setMessageSent] = useState("");
  const [allMessages, setAllMessages] = useState<any>();
  const recipientId = useParams();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/chat/${recipientId.id}`);
        if (!response.ok) return console.log("Error");

        if (response.status !== 200) return console.log("Not Authorized");

        const data = await response.json();
        setAllMessages(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMessages();
  }, []);

  const handleMessage = async (e: FormEvent) => {
    e.preventDefault();
    setMessageSent("");
    try {
      const response = await fetch(`/api/chat/${recipientId.id}/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      console.log(response);
      if (!response.ok) return console.log("Something went wrong");
      if (response.status !== 200) return console.log("It got rejected");
      const message = await response.json();
      console.log(message);
      setAllMessages([...data, message]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleMessageContent = (e: FormEvent) => {
    setMessageSent(e.currentTarget.value);
  };

  return (
    <div className="chat-container">
      <div className="recipient-info">
        <div className="user-photo">user-photo</div>
        <div className="user-name">Wizard</div>
      </div>
      <div className="chat-content">
        {allMessages?.map((message, index) => (
          <div key={index} className="messages">
            {`${recipientId.id}` == message.author ? (
              <div className="recipient">{message.content}</div>
            ) : (
              <div className="author">{message.content}</div>
            )}
          </div>
        ))}

        <div className="message-input">
          <form className="message-form" action="" onSubmit={handleMessage}>
            <textarea
              placeholder="message"
              title="message"
              cols={70}
              name="message"
              id="message"
              value={content}
              onChange={handleMessageContent}
            />
            <button className="send-button" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
      //{" "}
    </div>
  );
}

// [
//     {
//       author: "655bb4f4d6dc9df561758c33",
//       content: "Hello Wizard, Whatsapp?",
//       date: "2023-11-21T23:37:04.212Z",
//       recipient: "655b846aa11f1542411356bd",
//     },
//     {
//       author: "655b846aa11f1542411356bd",
//       content: "Hello Waldo, I am fine man, how are you doing?",
//       date: "2023-11-22T00:15:02.061Z",
//       recipient: "655bb4f4d6dc9df561758c33",
//     },
//   ];
