import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const BackgroundBox = ({ children, width, height, boxShadow, borderRadius }) => {
  return (
    <Wrapper width={width} height={height} boxShadow={boxShadow} borderRadius={borderRadius}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow: hidden;
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height};
  box-shadow: ${({ boxShadow, theme }) => boxShadow || theme.shadows.normal};
  border-radius: ${({ borderRadius }) => borderRadius || '1.6rem'};
`;

BackgroundBox.defaultProps = {
  children: <></>
};

BackgroundBox.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  boxShadow: PropTypes.string,
  borderRadius: PropTypes.string
};

export default BackgroundBox;
