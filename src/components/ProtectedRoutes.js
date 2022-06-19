import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

// Get user from local storage
const useAuth = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    return true;
  }

  return false;
};

export const ProtectedRoutes = () => {
  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to='/' />;
};
