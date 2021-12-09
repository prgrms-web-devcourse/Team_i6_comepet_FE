import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const Modal = ({ isVisible, top, left, right, bottom, children }) => {
  const el = document.getElementById('root');

  return ReactDOM.createPortal(
    <Wrapper isVisible={isVisible} top={top} left={left} right={right} bottom={bottom}>
      {children}
    </Wrapper>,
    el
  );
};

const Wrapper = styled.div`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  bottom: ${({ bottom }) => bottom};
  right: ${({ right }) => right};
`;

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isVisible: PropTypes.bool,
  top: PropTypes.string,
  left: PropTypes.string,
  bottom: PropTypes.string,
  right: PropTypes.string
};

export default Modal;
