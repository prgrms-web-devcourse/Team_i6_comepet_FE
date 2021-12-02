import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Input = ({
  padding,
  width,
  height,
  border,
  borderRadius,
  fontSize,
  placeholder,
  required
}) => {
  return (
    <StyledInput
      padding={padding}
      width={width}
      height={height}
      border={border}
      borderRadius={borderRadius}
      fontSize={fontSize}
      required={required}
      placeholder={placeholder}></StyledInput>
  );
};

const StyledInput = styled.input`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '3rem'};
  padding: ${({ padding }) => padding || '2rem'};
  border: ${({ border }) => border || '0'};
  border-radius: ${({ borderRadius }) => borderRadius || '1rem'};
  font-size: ${({ fontSize }) => fontSize || '1.6rem'};
  box-shadow: 0 0.4rem 1.6rem rgba(0, 0, 0, 0.08);
  ::-ms-input-placeholder {
    color: ${({ required, theme }) => (required && theme.colors.normalPink) || 'auto'};
    font-weight: bold;
  }
  ::-webkit-input-placeholder {
    color: ${({ required, theme }) => (required && theme.colors.normalPink) || 'auto'};
    font-weight: bold;
  }
  ::-moz-placeholder {
    color: ${({ required, theme }) => (required && theme.colors.normalPink) || 'auto'};
    font-weight: bold;
  }
`;

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  borderRadius: PropTypes.string,
  padding: PropTypes.string,
  border: PropTypes.string,
  fontSize: PropTypes.string,
  required: PropTypes.bool
};

export default Input;
