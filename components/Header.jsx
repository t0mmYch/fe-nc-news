import { useContext } from "react";
import { UserAccount } from "../contexts/UserAccount";
import { Link } from "react-router-dom";
import logo from "../src/assets/logo/logo.png";

const Header = () => {
  const { loggedInUser } = useContext(UserAccount);
  return (
    <header className="header">
      <Link to="/" className="logo-container">
        <img src={logo} alt="NC News Logo" className="logo" />
      </Link>
      <div className="user-info">
        {loggedInUser ? (
          <span>Welcome, {loggedInUser.username}</span>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
