import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Seperator = ({ width, height, type }) => {
  return <Wrapper type={type} width={width} height={height} />;
};

const Wrapper = styled.hr`
  width: ${({ type }) => type === 'vertical' && '0.1rem'};
  height: ${({ type, height }) => (type === 'horizon' && '0.1rem') || height};
  color: ${({ theme }) => theme.colors.lighterGray};
  border-bottom: 0;
`;

Seperator.propTypes = {
  type: PropTypes.node.isRequired,
  width: PropTypes.string,
  height: PropTypes.string
};

export default Seperator;
