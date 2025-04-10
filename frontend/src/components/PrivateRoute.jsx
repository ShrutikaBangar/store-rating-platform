import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn, getUserRole } from '../utils/auth';

const isAuthenticated = isLoggedIn;

const PrivateRoute = ({ children, roles }) => {
  if (!isAuthenticated()) return <Navigate to="/login" />;
  if (roles && !roles.includes(getUserRole())) return <Navigate to="/unauthorized" />;
  return children;
};

export default PrivateRoute;