import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const AlarmContext = createContext();

export const AlarmProvider = ({ children }) => {
  const [isUnreadNotification, setIsUnreadNotification] = useState(false);
  const value = { isUnreadNotification, setIsUnreadNotification };

  return <AlarmContext.Provider value={value}>{children}</AlarmContext.Provider>;
};

AlarmProvider.propTypes = {
  children: PropTypes.node
};
