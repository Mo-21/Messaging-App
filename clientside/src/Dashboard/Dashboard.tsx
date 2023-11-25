import { Outlet } from "react-router-dom";
import "./Dashboard.css";
import { ChatPartner, useChatPartners } from "./useChatPartners";

export default function Dashboard() {
  const { data: chatPartners, error, isLoading } = useChatPartners();

  if (error) return <h1>Something went wrong</h1>;
  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="dashboard">
      <div className="contact-list">
        <span className="contact-list-title">Contacts</span>
        {chatPartners?.map((chatPartner: ChatPartner) => (
          <div key={chatPartner.id} className="contact">
            {chatPartner.username}
          </div>
        ))}
      </div>
      <div className=" empty-space">
        <Outlet />
      </div>
    </div>
  );
}
