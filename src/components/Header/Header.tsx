import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Message from "../Message/Message";
import NotificationModal from "../NotificationModal/NotificationModal";
import "./Header.css";

interface HeaderProps {
  headerType: "loggedIn" | "loggedOut";
  logOut?: any;
  message?: string;
}

const Header: React.FC<HeaderProps> = ({
  headerType,
  logOut,
  message = "",
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
    document.querySelector(".overlay")?.classList.remove("hidden");
  };

  return (
    <header className={`site-header-${headerType}`}>
      <Link className="site-title" to="/">
        <h1>Stick To It</h1>
      </Link>
      {headerType === "loggedIn" && (
        <div className="link-container">
          <Message message={message} />
          <NavLink className="header-link" to="/today">
            Habits Today
          </NavLink>
          <NavLink className="header-link" to="/all-habits">
            Habits Week
          </NavLink>
          <button
            className="notifications-button"
            onClick={() => handleShowModal()}>
            &#x2709;
          </button>
          <button className="log-out-button" onClick={() => logOut()}>
            Log Out
          </button>
          <NotificationModal />
        </div>
      )}
    </header>
  );
};

export default Header;
