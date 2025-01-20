import React from 'react';
import { Navigate, RouteProps } from 'react-router-dom';

// A private route that checks if the user is logged in
const PrivateRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
  const isUser = localStorage.getItem('isUser'); // Check if user is logged in
  return isUser ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
