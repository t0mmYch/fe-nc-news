import { Link } from "react-router-dom"
import '../src/Nav.css';

function Nav() {
  return (
    <nav className="main-nav">
      {/* <h1>NC News by Tommy</h1> */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/articles">Articles</Link>
      </div>
    </nav>
  );
}

export default Nav;