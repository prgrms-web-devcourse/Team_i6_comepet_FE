import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const CheckBox = ({ onChange, propRef, id, text, marginBetween, fontSize, margin, fontColor }) => {
  return (
    <Wrapper margin={margin}>
      <Input
        onChange={onChange}
        type="checkbox"
        id={id}
        marginBetween={marginBetween}
        ref={propRef}
      />
      <Label htmlFor={id} fontSize={fontSize} fontColor={fontColor}>
        {text || '모름'}
      </Label>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  margin: ${({ margin }) => margin || '0'};
`;

const Input = styled.input`
  margin-right: ${({ marginBetween }) => marginBetween || '1rem'};
  cursor: pointer;
`;

const Label = styled.label`
  font-size: ${({ fontSize }) => fontSize || '1rem'};
  color: ${({ fontColor, theme }) => theme.colors[fontColor]};
`;

CheckBox.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  text: PropTypes.string,
  marginBetween: PropTypes.string,
  fontSize: PropTypes.string,
  fontColor: PropTypes.string,
  margin: PropTypes.string,
  propRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  })
};

export default CheckBox;
