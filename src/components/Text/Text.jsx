import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Text = ({ children, color, margin }) => {
  return (
    <Wrapper color={color} margin={margin}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.span`
  display: inline-block;
  margin: ${({ margin }) => margin};
  color: ${({ theme, color }) => theme.colors[color] || color};
  font-weight: bold;
`;

Text.propTypes = {
  color: PropTypes.string.isRequired,
  margin: PropTypes.string,
  children: PropTypes.string
};

export default Text;
