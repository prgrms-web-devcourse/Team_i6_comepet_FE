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
  color,
  fontWeight,
  wordBreak,
  whiteSpace
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
      color={color}
      fontWeight={fontWeight}
      wordBreak={wordBreak}
      whiteSpace={whiteSpace}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.label`
  display: inline-flex;
  justify-content: center;
  width: ${({ size, theme }) => theme.sizes.label[size]};
  font-size: ${({ fontSize, size }) => (size === 'xsmall' && '1.1rem') || fontSize || '1.6rem'};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding || '0.6rem 1rem 0.6rem 1rem'};
  border-radius: ${({ borderRadius }) => borderRadius || '1.6rem'};
  background-color: ${({ bgColor, theme }) => theme.colors[bgColor] || theme.colors.lighterGray};
  color: ${({ color, theme }) => theme.colors[color] || theme.colors.normalWhite};
  font-weight: ${({ fontWeight }) => fontWeight || 'bold'};
  word-break: ${({ wordBreak }) => wordBreak || 'keep-all'};
  white-space: ${({ whiteSpace }) => whiteSpace || 'nowrap'};
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
  color: PropTypes.string,
  fontWeight: PropTypes.string,
  wordBreak: PropTypes.string,
  whiteSpace: PropTypes.string
};

export default Label;
