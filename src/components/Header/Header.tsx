import { Link, NavLink } from "react-router-dom";
import Message from "../Message/Message";
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
          <button className="log-out-button" onClick={() => logOut()}>
            Log Out
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
