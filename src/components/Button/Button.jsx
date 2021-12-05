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
  fontSize,
  fontWeight
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
      fontSize={fontSize}
      fontWeight={fontWeight}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.button`
<<<<<<< HEAD
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color, theme }) => color || theme.colors.normalWhite};
=======
  background-color: ${({ bgColor, theme }) => theme.colors[bgColor]};
  color: ${({ color, theme }) => theme.colors[color] || theme.colors.normalWhite};
>>>>>>> 4f56f55308d57b1f22e218a4968f93343274dad6
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '4rem'};
  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding || '0'};
  border: ${({ border }) => border || '0'};
  border-radius: ${({ borderRadius }) => borderRadius || '0.4rem'};
  font-size: ${({ fontSize }) => fontSize || '1.6rem'};
  font-weight: ${({ fontWeight }) => fontWeight};
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
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string
};

export default Button;
