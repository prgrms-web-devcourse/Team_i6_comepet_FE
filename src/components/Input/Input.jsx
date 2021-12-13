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
  placeholder,
  type,
  name,
  value,
  minLength,
  maxLength,
  accept,
  required,
  margin,
  onChange,
  onBlur,
  disabled
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
      required={required}
      placeholder={placeholder}
      type={type}
      name={name}
      value={value}
      maxLength={maxLength}
      minLength={minLength}
      accept={accept}
      margin={margin}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
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
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  minLength: PropTypes.string,
  maxLength: PropTypes.string,
  accept: PropTypes.string,
  required: PropTypes.bool,
  margin: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool
};

export default Input;
