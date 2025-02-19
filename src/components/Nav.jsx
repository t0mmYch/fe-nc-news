import { Link } from "react-router-dom"
import '../Nav.css';

function Nav() {
  return (
    <nav className="main-nav">
      {/* <h1>NC News by Tommy</h1> */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/articles">Articles</Link>
        <link to="/topics">Topics</link>
        <link to="/login">Login</link>
      </div>
    </nav>
  );
}

export default Nav;