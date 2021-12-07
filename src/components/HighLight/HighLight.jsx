import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const HighLight = ({ children, color }) => {
  return <Wrapper color={color}>{children}</Wrapper>;
};

const Wrapper = styled.span`
  color: ${({ theme, color }) => theme.colors[color] || color};
  font-weight: bold;
`;

HighLight.propTypes = {
  color: PropTypes.string.isRequired,
  children: PropTypes.string
};

export default HighLight;
