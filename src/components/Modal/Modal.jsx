import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import useClickAway from '@/hooks/useClickAway';
import ReactDOM from 'react-dom';

const Modal = ({ onClose, top, left, right, bottom, children }) => {
  const [ref] = useClickAway(() => onClose && onClose());

  const el = useMemo(() => document.getElementById('root'), []);

  return ReactDOM.createPortal(
    <Background>
      <ContentWrapper ref={ref} top={top} left={left} right={right} bottom={bottom}>
        {children}
      </ContentWrapper>
    </Background>,
    el
  );
};

const Background = styled.div`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
`;

const ContentWrapper = styled.div`
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  bottom: ${({ bottom }) => bottom};
  right: ${({ right }) => right};
  z-index: 1000;
`;

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  top: PropTypes.string,
  left: PropTypes.string,
  bottom: PropTypes.string,
  right: PropTypes.string
};

export default Modal;
