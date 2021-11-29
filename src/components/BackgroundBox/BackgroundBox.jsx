import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const BackgroundBox = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  background: #ffffff;
  box-shadow: 0 0.8rem 2.4rem rgba(0, 0, 0, 0.16);
  border-radius: 1.6rem;
`;

BackgroundBox.defaultProps = {
  children: <></>
};

BackgroundBox.propTypes = {
  children: PropTypes.node
};

export default BackgroundBox;
