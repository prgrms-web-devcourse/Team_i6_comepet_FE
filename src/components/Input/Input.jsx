import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Input = ({
  id,
  padding,
  width,
  height,
  border,
  borderRadius,
  fontSize,
  bgColor,
  placeholder,
  type,
  name,
  value,
  minlength,
  maxlength,
  accept,
  required,
  readOnly,
  disabled,
  onChange,
  onBlur,
  margin
}) => {
  return (
    <StyledInput
      id={id}
      padding={padding}
      width={width}
      height={height}
      border={border}
      borderRadius={borderRadius}
      fontSize={fontSize}
      bgColor={bgColor}
      required={required}
      readOnly={readOnly}
      disabled={disabled}
      placeholder={placeholder}
      type={type}
      name={name}
      value={value}
      maxlength={maxlength}
      minlength={minlength}
      accept={accept}
      onChange={onChange}
      onBlur={onBlur}
      margin={margin}
    />
  );
};

const StyledInput = styled.input`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '3rem'};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding || '2rem'};
  border: ${({ border }) => border || '0'};
  border-radius: ${({ borderRadius }) => borderRadius || '1rem'};
  font-size: ${({ fontSize }) => fontSize || '1.6rem'};
  background-color: ${({ theme, bgColor }) => theme.colors[bgColor] || theme.colors.normalWhite};
  box-shadow: 0 0.4rem 1.6rem rgba(0, 0, 0, 0.08);
  ::-ms-input-placeholder {
    color: ${({ required, theme }) => (required && theme.colors.normalPink) || 'auto'};
  }
  ::-webkit-input-placeholder {
    color: ${({ required, theme }) => (required && theme.colors.normalPink) || 'auto'};
  }
  ::-moz-placeholder {
    color: ${({ required, theme }) => (required && theme.colors.normalPink) || 'auto'};
  }
`;

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  id: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  borderRadius: PropTypes.string,
  padding: PropTypes.string,
  border: PropTypes.string,
  fontSize: PropTypes.string,
  bgColor: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  minlength: PropTypes.string,
  maxlength: PropTypes.string,
  accept: PropTypes.string,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  margin: PropTypes.string
};

export default Input;
