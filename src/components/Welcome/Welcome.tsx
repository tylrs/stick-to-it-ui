import { Link } from "react-router-dom";
import "./Welcome.css";

const Welcome = () => {
    return (
        <section className="welcome-page-container">
            <Link className="account-link to-log-in" to="/login">
                <button className="account-link-wrapper">Login</button>
            </Link>
            <Link className="account-link to-create-account" to="/create-account">
                <button className="account-link-wrapper">Create Account</button>
            </Link>
        </section>
    )
}

export default Welcome