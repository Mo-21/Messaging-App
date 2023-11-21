import "./Chat.css";

export default function Chat() {
  return (
    <div className="chat-container">
      <div className="recipient-info">
        <div className="user-photo">user-photo</div>
        <div className="user-name">user-name</div>
      </div>
      <div className="chat-content">chat-content</div>
      <div className="message-input">
        <form action="">
          <label htmlFor="message">Message</label>
          <input type="text" name="message" id="message" />
        </form>
      </div>
    </div>
  );
}
