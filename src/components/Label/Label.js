import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Label = ({
  children,
  forHtml,
  fontSize,
  size,
  margin,
  padding,
  borderRadius,
  bgColor,
  color
}) => {
  return (
    <Wrapper
      forHtml={forHtml}
      fontSize={fontSize}
      size={size}
      margin={margin}
      padding={padding}
      borderRadius={borderRadius}
      bgColor={bgColor}
      color={color}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.label`
  display: inline-flex;
  justify-content: center;
  width: ${({ size, theme }) => theme.sizes.label[size]};
  font-size: ${({ fontSize }) => fontSize || '1.6rem'};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding || '0.6rem 1rem 0.6rem 1rem'};
  border-radius: ${({ borderRadius }) => borderRadius || '1.6rem'};
  background-color: ${({ bgColor, theme }) => bgColor || theme.colors.lighterGray};
  color: ${({ color, theme }) => color || theme.colors.normalWhite};
  font-weight: bold;
`;

Label.propTypes = {
  children: PropTypes.node.isRequired,
  bgColor: PropTypes.string.isRequired,
  forHtml: PropTypes.string,
  fontSize: PropTypes.string,
  size: PropTypes.string,
  margin: PropTypes.string,
  padding: PropTypes.string,
  borderRadius: PropTypes.string,
  color: PropTypes.string
};

export default Label;
