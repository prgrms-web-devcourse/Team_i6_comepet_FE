import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Dots = ({ length, targetIndex, handleClick }) => {
  return (
    <Wrapper onClick={handleClick}>
      {Array.from({ length }).map((_, index) => (
        <Dot id={index} key={index} targetIndex={targetIndex === index} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.button`
  cursor: normal;
  display: flex;
`;

const Dot = styled.div`
  background-color: ${({ theme }) => theme.colors.normalWhite};
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  border: 0.15rem solid #f1f1f1;
  margin: 0 0.4rem;
  cursor: pointer;
  background-color: ${({ targetIndex }) => targetIndex && 'rgb(32, 32, 32)'};
`;

Dots.propTypes = {
  length: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  targetIndex: PropTypes.number
};

export default Dots;
