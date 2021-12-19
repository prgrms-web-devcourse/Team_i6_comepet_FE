import React, { useEffect, useState, createContext } from 'react';
import PropTypes from 'prop-types';
import { GET } from '@/apis/axios';
import { getCookie } from '@/utils/cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const value = { isLoggedIn, setIsLoggedIn, userId };

  useEffect(() => {
    const userToken = getCookie('token');

    const getAuthStatus = async () => {
      const userAuthData = await GET('/auth-user');
      const userAuthId = userAuthData?.id;
      userAuthId && setIsLoggedIn(true);
      setUserId(userAuthId);
    };

    userToken && getAuthStatus();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node
};
