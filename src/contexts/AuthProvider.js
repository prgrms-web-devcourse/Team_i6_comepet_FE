import React, { useEffect, useState, createContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { getCookie, removeCookie } from '@/utils/cookie';
import { AUTH_ERROR } from '@/utils/constants';
import { GET } from '@/apis/axios';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isUnreadNotification, setIsUnreadNotification] = useState(false);
  const value = {
    isLoggedIn,
    setIsLoggedIn,
    userId,
    setUserId,
    isUnreadNotification,
    setIsUnreadNotification
  };
  const navigate = useNavigate();

  useEffect(() => {
    const TOKEN = getCookie('token');

    const setHeaderToken = (TOKEN) => {
      axios.defaults.headers.common['Authorization'] = (TOKEN && `Bearer ${TOKEN}`) || '';
    };

    const getAuthStatus = async () => {
      try {
        await setHeaderToken(TOKEN);
        const userIdData = await GET('/auth-user');
        userIdData && setIsLoggedIn(true);
        setUserId(userIdData?.id);
      } catch (error) {
        alert(AUTH_ERROR.EXPIRED_TOKEN);
        navigate('/login', { replace: true });
        removeCookie('token');
      }
    };

    if (TOKEN) {
      getAuthStatus();
    }
  }, [isLoggedIn]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node
};
