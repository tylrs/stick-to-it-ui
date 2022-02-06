import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header: React.FC<{headerType: string, logOut?: any}> = ({ headerType, logOut }) => {

    return (
        <header className={`site-header-${headerType}`}>
            <Link className="site-title" to="/"><h1>Stick To It</h1></Link>
            {headerType === "loggedIn" &&
            <div className="link-container">
                <Link className="header-link" to="/">Today</Link>
                <Link className="header-link" to="/all-habits">All Habits</Link>
                <Link className="header-link" to="/">Account</Link>
                <button className="log-out-button" onClick={() => logOut()}>Log Out</button>
            </div>}
        </header>
    )
}

export default Header