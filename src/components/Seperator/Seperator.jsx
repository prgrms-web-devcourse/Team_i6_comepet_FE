import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Seperator = ({ width, height, type, margin, bgColor }) => {
  return <Wrapper type={type} width={width} height={height} margin={margin} bgColor={bgColor} />;
};

const Wrapper = styled.hr`
  width: ${({ type, width }) => (type === 'vertical' && (width || '0.05rem')) || width};
  height: ${({ type, height }) => (type === 'horizon' && (height || '0.05rem')) || height};
  background-color: ${({ theme, bgColor }) => theme.colors[bgColor] || theme.colors.lighterGray};
  margin: ${({ margin }) => margin || '0'};
  border: 0;
`;

Seperator.propTypes = {
  type: PropTypes.node.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  margin: PropTypes.string,
  bgColor: PropTypes.string
};

export default Seperator;
