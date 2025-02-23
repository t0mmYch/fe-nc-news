import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserAccount } from '../contexts/UserAccount';

const AuthenticationRoute = ({ children }) => {
  const { loggedInUser } = useContext(UserAccount);
  const location = useLocation();

  if (!loggedInUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AuthenticationRoute;