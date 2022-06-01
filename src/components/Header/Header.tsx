import { Link, NavLink } from "react-router-dom";
import Message from "../Message/Message";
import "./Header.css";

interface HeaderProps {
  headerType: "loggedIn" | "loggedOut";
  logOut?: any;
  message?: string;
  setShowModal?: any;
  invitationsInfoCount?: number;
}

const Header: React.FC<HeaderProps> = ({
  headerType,
  logOut,
  message = "",
  setShowModal,
  invitationsInfoCount,
}) => {
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
          <span className="notifications-button-container">
            <button
              className="notifications-button"
              onClick={() => handleShowModal()}>
              &#x2709;
            </button>
            {!!invitationsInfoCount && (
              <span className="header-notification-counter">
                {invitationsInfoCount}
              </span>
            )}
          </span>
          <button className="log-out-button" onClick={() => logOut()}>
            Log Out
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
