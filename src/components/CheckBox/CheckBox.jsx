import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const CheckBox = ({ id, text, marginBetween, fontSize, margin }) => {
  return (
    <Wrapper>
      <CheckBoxContainer margin={margin}>
        <StyledInput type="checkbox" id={id} marginBetween={marginBetween} />
        <StyledLabel htmlFor={id} fontSize={fontSize}>
          {text || '모름'}
        </StyledLabel>
      </CheckBoxContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const CheckBoxContainer = styled.span`
  display: flex;
  align-content: center;
  margin: ${({ margin }) => margin || '0'};
`;

const StyledInput = styled.input`
  margin-right: ${({ marginBetween }) => marginBetween || '1rem'};
  font-size: ${({ fontSize }) => fontSize || '1rem'};
  cursor: pointer;
`;

const StyledLabel = styled.label``;

CheckBox.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string,
  marginBetween: PropTypes.string,
  fontSize: PropTypes.string,
  margin: PropTypes.string
};

export default CheckBox;
