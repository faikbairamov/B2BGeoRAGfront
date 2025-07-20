import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  // Optionally, add logic to validate the token (e.g., check expiry)
  return !!localStorage.getItem('token');
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/signup" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;