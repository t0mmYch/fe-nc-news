import { useContext } from "react";
import { UserAccount } from "../contexts/UserAccount";  
import { redirect } from "react-router-dom"


const Header =() => {
    const {loggedInUser} = useContext(UserAccount);
    console.log(loggedInUser);
    
}


export default Header