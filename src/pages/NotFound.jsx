import { NavLink } from "react-router";
const NotFound = () => {
    return (
        <div className="notFound">
            <h1>Opps, Something Went Wrong :X </h1>
            <p>Page Is Not Found</p>
            <button><NavLink to="/" end>Return to Home page</NavLink></button>
        </div>
    )
}
export default NotFound