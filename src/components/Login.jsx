import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserAccount } from "../contexts/UserAccount";
import "../Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { setLoggedInUser, loggedInUser } = useContext(UserAccount);
  const navigate = useNavigate();
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState("");

  const validUsers = [
    { username: "grumpy19", name: "Paul Grump" },
    { username: "tickle122", name: "Tom Tickle" },
    { username: "happyamy2016", name: "Amy Happy" },
    { username: "cooljmessy", name: "Peter Messy" },
    { username: "weegembump", name: "Gemma Bump" },
    { username: "jessjelly", name: "Jess Jelly" },
  ];

  useEffect(() => {
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setLoggedInUser(user);
        navigate('/articles');
      } catch (err) {
        localStorage.removeItem('loggedInUser');
      }
    }
  }, [setLoggedInUser, navigate]);

  const authenticateUser = async (username) => {
    const user = validUsers.find((user) => user.username === username);
    if (!user) {
      throw new Error("Invalid username. Please try again or select from demo users below.");
    }
    return user;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const user = await authenticateUser(username);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccessMessage(`Welcome back, ${user.name}!`);
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      setLoggedInUser(user);
      await new Promise(resolve => setTimeout(resolve, 500));
      const from = location.state?.from?.pathname || "/articles";
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
      setUsername("");
    } finally {
      setIsLoading(false);
    }
  };
  const handleDemoUserClick = (selectedUser) => {
    setUsername(selectedUser.username);
    setError("");
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
  };
  if (loggedInUser) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>Welcome, {loggedInUser.name}!</h2>
            <p>You are already logged in</p>
          </div>
          <button 
            onClick={handleLogout}
            className="login-button"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

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
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              placeholder="Enter your username"
              disabled={isLoading}
              required
              autoComplete="username"
              className={error ? "error" : ""}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}
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
       onClick={() => handleDemoUserClick(user)}
       className={`demo-user-button ${username === user.username ? "selected" : ""}`}
       disabled={isLoading}
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
