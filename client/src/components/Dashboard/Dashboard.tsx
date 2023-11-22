import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="contact-list">
        <span className="contact-list-title">Contacts</span>
        <div className="contact">contact1</div>
        <div className="contact">contact2</div>
        <div className="contact">contact3</div>
        <div className="contact">contact4</div>
        <div className="contact">contact5</div>
      </div>
      <div className=" empty-space">
        Select a chat to start chatting<div>As simple as that</div>
      </div>
    </div>
  );
}
