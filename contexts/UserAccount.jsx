import { createContext, useState } from "react";
import { redirect } from "react-router";

export const UserAccount = createContext(null);

export const UserAccountProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(
    localStorage.getItem("username") 
  );
  
  return (
    <UserAccount.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </UserAccount.Provider>
  );
};
