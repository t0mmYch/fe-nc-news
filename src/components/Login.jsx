import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserAccount } from "../contexts/UserAccount";
import "../Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { setLoggedInUser } = useContext(UserAccount);
  const navigate = useNavigate();

  const validUsers = [
    { username: "grumpy19", name: "Paul Grump" },
    { username: "tickle122", name: "Tom Tickle" },
    { username: "happyamy2016", name: "Amy Happy" },
    { username: "cooljmessy", name: "Peter Messy" },
    { username: "weegembump", name: "Gemma Bump" },
    { username: "jessjelly", name: "Jess Jelly" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      const user = validUsers.find((user) => user.username === username);
      if (user) {
        setLoggedInUser(user);
        navigate("/articles");
      } else {
        setError("Invalid username. Please try again.");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Please Enter Your Username</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
         type="text"
         id="username"
         value={username}
         onChange={(e) => setUsername(e.target.value)}
         placeholder="Enter your username"
         disabled={isLoading}
         required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button
            type="submit"
            className={`login-button ${isLoading ? "loading" : ""}`}
            disabled={isLoading || !username.trim()}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="demo-users">
          <p>Demo Users:</p>
          <div className="demo-users-list">
            {validUsers.map((user) => (
              <button
            key={user.username}
            onClick={() => setUsername(user.username)}
            className="demo-user-button"
              >
                {user.username}
              </button>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
