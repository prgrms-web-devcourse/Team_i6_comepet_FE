import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const CheckBox = ({ id, text, spaceBetween, fontSize, margin }) => {
  return (
    <Wrapper>
      <CheckBoxContainer margin={margin}>
        <StyledInput type="checkbox" id={id} spaceBetween={spaceBetween} />
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
  margin-right: ${({ spaceBetween }) => spaceBetween || '1rem'};
  font-size: ${({ fontSize }) => fontSize || '1rem'};
  cursor: pointer;
`;

const StyledLabel = styled.label``;

CheckBox.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string,
  spaceBetween: PropTypes.string,
  fontSize: PropTypes.string,
  margin: PropTypes.string
};

export default CheckBox;
