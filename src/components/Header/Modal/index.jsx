import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import NotificationModal from './NotificationModal';
import SidebarModal from './SidebarModal';
import ReactDOM from 'react-dom';

const Modal = ({ isNotificationModalVisible, isSidebarModalVisible }) => {
  const el = useMemo(() => document.querySelector('body'), []);

  return ReactDOM.createPortal(
    (isNotificationModalVisible && <NotificationModal visible={isNotificationModalVisible} />) ||
      (isSidebarModalVisible && <SidebarModal visible={isSidebarModalVisible} />),
    el
  );
};

Modal.propTypes = {
  isNotificationModalVisible: PropTypes.bool,
  isSidebarModalVisible: PropTypes.bool
};

export default Modal;
