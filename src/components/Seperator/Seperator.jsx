import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Seperator = ({ width, height, type, margin }) => {
  return <Wrapper type={type} width={width} height={height} margin={margin} />;
};

const Wrapper = styled.hr`
  width: ${({ type }) => type === 'vertical' && '0.05rem'};
  height: ${({ type, height }) => (type === 'horizon' && '0.05rem') || height};
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
