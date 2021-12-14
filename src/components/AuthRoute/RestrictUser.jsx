import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

const RestrictUser = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to={-1} />;
  }

  return <Outlet />;
};

RestrictUser.propTypes = {
  isRestricted: PropTypes.bool
};

export default RestrictUser;
