import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Seperator = ({ width, height, type, margin }) => {
  return <Wrapper type={type} width={width} height={height} margin={margin} />;
};

const Wrapper = styled.hr`
  width: ${({ type, width }) => type === 'vertical' && (width || '0.05rem')};
  height: ${({ type, height }) => type === 'horizon' && (height || '0.05rem')};
  background-color: ${({ theme }) => theme.colors.lighterGray};
  margin: ${({ margin }) => margin || '0'};
  border: none;
`;

Seperator.propTypes = {
  type: PropTypes.node.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  margin: PropTypes.string
};

export default Seperator;
