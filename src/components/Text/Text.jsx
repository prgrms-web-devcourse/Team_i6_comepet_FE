import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Text = ({ children, color, margin, fontSize, fontWeight, cursor }) => {
  return (
    <Wrapper
      color={color}
      margin={margin}
      fontSize={fontSize}
      fontWeight={fontWeight}
      cursor={cursor}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.span`
  display: inline-block;
  margin: ${({ margin }) => margin};
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  color: ${({ theme, color }) => theme.colors[color] || color};
  cursor: ${({ cursor }) => cursor};
`;

Text.propTypes = {
  color: PropTypes.string.isRequired,
  margin: PropTypes.string,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  cursor: PropTypes.string,
  children: PropTypes.string
};

export default Text;
