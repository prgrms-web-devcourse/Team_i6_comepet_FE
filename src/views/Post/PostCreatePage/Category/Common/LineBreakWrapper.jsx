import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const LineBreakWrapper = ({ margin, children }) => {
  return <Wrapper margin={margin}>{children}</Wrapper>;
};

const Wrapper = styled.div`
  margin: ${({ margin }) => margin};
`;

LineBreakWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  margin: PropTypes.string
};

export default LineBreakWrapper;
