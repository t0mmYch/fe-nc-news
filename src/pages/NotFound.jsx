import { NavLink } from "react-router";
import '../NotFound.css'

const NotFound = ({ status, message, returnPath = "/" }) => {
    const defaultMessage = {
        400: "Bad Request",
        404: "Page Not Found",
        500: "Server Error",
      };

    return (
        <div className="error-container">
          <div className="error-content">
            <h1>Opps, Something Went Wrong :X </h1>
            <p>{message || defaultMessage[status] || "Something Went Wrong"}</p>
            <button><NavLink to="/" end>Return to Home page</NavLink></button>
        </div>
        </div>   
    )
}
export default NotFound