import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // TODO: 인증 API에서 확인한 로그인 여부를 기본값으로 사용
  const value = { isLoggedIn, setIsLoggedIn };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node
};
