import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import useClickAway from '@/hooks/useClickAway';
import useBlockScroll from '@/hooks/useBlockScroll';
import ReactDOM from 'react-dom';

const Modal = ({
  children,
  onClose,
  top,
  left,
  right,
  bottom,
  transform,
  width,
  padding,
  boxShadow,
  maxWidth
}) => {
  const [ref] = useClickAway(() => onClose && onClose());
  const el = useMemo(() => document.getElementById('root'), []);

  useBlockScroll(document.body);

  return ReactDOM.createPortal(
    <Background>
      <ContentWrapper
        ref={ref}
        top={top}
        left={left}
        right={right}
        bottom={bottom}
        transform={transform}
        width={width}
        padding={padding}
        boxShadow={boxShadow}
        maxWidth={maxWidth}>
        {children}
      </ContentWrapper>
    </Background>,
    el
  );
};

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
`;

const ContentWrapper = styled.div`
  position: absolute;
  top: ${({ top }) => top || '50%'};
  left: ${({ left }) => left || '50%'};
  bottom: ${({ bottom }) => bottom};
  right: ${({ right }) => right};
  transform: ${({ transform }) => transform || 'translate(-50%, -50%)'};
  z-index: 1000;
  width: ${({ width }) => width || '100%'};
  max-width: ${({ maxWidth }) => maxWidth || '100%'};
  padding: ${({ padding }) => padding};
  border-radius: 1.6rem;
  background-color: ${({ theme }) => theme.colors.normalWhite};
  box-shadow: ${({ boxShadow, theme }) => theme.shadows[boxShadow] || theme.shadows.normal};
`;

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  top: PropTypes.string,
  left: PropTypes.string,
  bottom: PropTypes.string,
  right: PropTypes.string
};

export default Modal;
