import { createContext, useState } from "react";

export const UserAccount = createContext();

export const UserAccountProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState({username: 'coolmessy'})


const handleSetLoggedInUser = (user) => {
  setLoggedInUser(user)
}

  return (
    <UserAccount.Provider
      value={{
        loggedInUser,
        setLoggedInUser: handleSetLoggedInUser
      }}
    >
      {children}
    </UserAccount.Provider>
  );
};
