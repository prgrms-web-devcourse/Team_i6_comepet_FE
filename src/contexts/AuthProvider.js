import React, { useEffect, useState, createContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { getCookie, removeCookie } from '@/utils/cookie';
import { AUTH_ERROR } from '@/utils/constants';
import { GET } from '@/apis/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const value = { isLoggedIn, setIsLoggedIn, userId };
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = getCookie('token');

    const getAuthStatus = async () => {
      try {
        const userIdData = await GET('/auth-user');
        userIdData && setIsLoggedIn(true);
        setUserId(userIdData?.id);
      } catch (error) {
        alert(AUTH_ERROR.EXPIRED_TOKEN);
        navigate('/login', { replace: true });
        removeCookie('token');
      }
    };

    userToken && getAuthStatus();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node
};
