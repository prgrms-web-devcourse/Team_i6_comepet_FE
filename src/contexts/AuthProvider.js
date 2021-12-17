import React, { useEffect, useState, createContext } from 'react';
import PropTypes from 'prop-types';
import { GET } from '@/apis/axios';
import { getCookie } from '@/utils/cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const value = { isLoggedIn, setIsLoggedIn };

  useEffect(() => {
    const userToken = getCookie('token');

    const getAuthStatus = async () => {
      const userIdData = await GET('/auth-user');
      userIdData && setIsLoggedIn(true);
    };

    userToken && getAuthStatus();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node
};
