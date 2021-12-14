import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

const RequireAuth = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

RequireAuth.propTypes = {
  isRestricted: PropTypes.bool
};

export default RequireAuth;
