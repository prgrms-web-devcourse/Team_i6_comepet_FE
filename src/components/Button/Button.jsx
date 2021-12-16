import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Button = ({
  id,
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
  fontWeight,
  top,
  right,
  left,
  bottom,
  position,
  onClick,
  disabled
}) => {
  return (
    <Wrapper
      id={id}
      type={type || 'button'}
      bgColor={bgColor}
      color={color}
      width={width}
      height={height}
      margin={margin}
      padding={padding}
      border={border}
      borderRadius={borderRadius}
      fontSize={fontSize}
      fontWeight={fontWeight}
      top={top}
      left={left}
      right={right}
      bottom={bottom}
      position={position}
      onClick={onClick}
      disabled={disabled}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ bgColor, disabled, theme }) =>
    disabled ? theme.colors.normalGray : theme.colors[bgColor]};
  color: ${({ color, theme }) => theme.colors[color] || theme.colors.normalWhite};
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '4rem'};
  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding || '0'};
  border: ${({ border }) => border || '0'};
  border-radius: ${({ borderRadius }) => borderRadius || '0.4rem'};
  font-size: ${({ fontSize }) => fontSize || '1.6rem'};
  font-weight: ${({ fontWeight }) => fontWeight};
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};
  position: ${({ position }) => position};
`;

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  id: PropTypes.string,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  margin: PropTypes.string,
  padding: PropTypes.string,
  border: PropTypes.string,
  borderRadius: PropTypes.string,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  top: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string,
  bottom: PropTypes.string,
  position: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

export default Button;
