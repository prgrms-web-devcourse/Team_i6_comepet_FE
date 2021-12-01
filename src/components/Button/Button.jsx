import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Button = ({
  children,
  type,
  bgColor,
  color,
  width,
  height,
  margin,
  padding,
  border,
  borderRadius,
  fontSize
}) => {
  return (
    <Wrapper
      type={type}
      bgColor={bgColor}
      color={color}
      width={width}
      height={height}
      margin={margin}
      padding={padding}
      border={border}
      borderRadius={borderRadius}
      fontSize={fontSize}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.button`
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color, theme }) => color || theme.colors.normalWhite};
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '4rem'};
  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding || '0'};
  border: ${({ border }) => border || '0'};
  border-radius: ${({ borderRadius }) => borderRadius || '0.4rem'};
  font-size: ${({ fontSize }) => fontSize || '1.6rem'};
`;

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  margin: PropTypes.string,
  padding: PropTypes.string,
  border: PropTypes.string,
  borderRadius: PropTypes.string,
  fontSize: PropTypes.string
};

export default Button;
