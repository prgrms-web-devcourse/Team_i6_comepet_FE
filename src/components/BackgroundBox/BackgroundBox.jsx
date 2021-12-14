import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const BackgroundBox = ({ children, margin, width, height, boxShadow, borderRadius }) => {
  return (
    <Wrapper
      margin={margin}
      width={width}
      height={height}
      boxShadow={boxShadow}
      borderRadius={borderRadius}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow: hidden;
  margin: ${({ margin }) => margin || '0'};
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height};
  background-color: ${({ theme }) => theme.colors.normalWhite};
  box-shadow: ${({ boxShadow, theme }) => theme.shadows[boxShadow] || theme.shadows.normal};
  border-radius: ${({ borderRadius }) => borderRadius || '1.6rem'};
  position: relative;
`;

BackgroundBox.defaultProps = {
  children: <></>
};

BackgroundBox.propTypes = {
  children: PropTypes.node.isRequired,
  margin: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  boxShadow: PropTypes.string,
  borderRadius: PropTypes.string
};

export default BackgroundBox;
