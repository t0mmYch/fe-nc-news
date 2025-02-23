import { createContext, useState, useEffect} from "react";
//import { redirect } from "react-router";

export const UserAccount = createContext();

export const UserAccountProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null)
  
  useEffect(() => {
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
      try {
        setLoggedInUser(JSON.parse(savedUser));
      } catch (err) {
        localStorage.removeItem('loggedInUser');
      }
    }
  }, []);

  const handleSetLoggedInUser = (user) => {
    console.log('Setting logged in user:', user);
    setLoggedInUser(user);
  };


  return (
    <UserAccount.Provider value={{ loggedInUser, setLoggedInUser:  handleSetLoggedInUser}}>
      {children}
    </UserAccount.Provider>
  );
};