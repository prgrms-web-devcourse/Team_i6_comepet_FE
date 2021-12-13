import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const CheckBox = ({ id, text, marginBetween, fontSize, margin, fontColor }) => {
  return (
    <Wrapper margin={margin}>
      <StyledInput type="checkbox" id={id} marginBetween={marginBetween} />
      <StyledLabel htmlFor={id} fontSize={fontSize} fontColor={fontColor}>
        {text || '모름'}
      </StyledLabel>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  margin: ${({ margin }) => margin || '0'};
`;

const StyledInput = styled.input`
  margin-right: ${({ marginBetween }) => marginBetween || '1rem'};
  cursor: pointer;
`;

const StyledLabel = styled.label`
  font-size: ${({ fontSize }) => fontSize || '1rem'};
  color: ${({ fontColor, theme }) => theme.colors[fontColor]};
`;

CheckBox.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string,
  marginBetween: PropTypes.string,
  fontSize: PropTypes.string,
  fontColor: PropTypes.string,
  margin: PropTypes.string
};

export default CheckBox;
