import React, { useEffect, useState, createContext } from 'react';
import PropTypes from 'prop-types';
import { GET } from '@/apis/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const value = { isLoggedIn, setIsLoggedIn };

  useEffect(() => {
    const getAuthStatus = async () => {
      const userIdData = await GET('/auth-user');
      userIdData && setIsLoggedIn(true);
    };

    getAuthStatus();
  }, [isLoggedIn]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node
};
