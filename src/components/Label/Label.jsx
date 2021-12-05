import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Label = ({ children, forHtml, fontSize, margin, padding, borderRadius, bgColor, color }) => {
  return (
    <Wrapper
      forHtml={forHtml}
      fontSize={fontSize}
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
  display: inline-block;
  font-size: ${({ fontSize }) => fontSize || '1.6rem'};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding || '0.6rem'};
  border-radius: ${({ borderRadius }) => borderRadius || '1.6rem'};
  background-color: ${({ bgColor, theme }) => theme.colors[bgColor] || theme.colors.normalGray};
  color: ${({ color, theme }) => theme.colors[color] || theme.colors.normalWhite};
  font-weight: bold;
`;

Label.propTypes = {
  children: PropTypes.node.isRequired,
  bgColor: PropTypes.string.isRequired,
  forHtml: PropTypes.string.isRequired,
  fontSize: PropTypes.string,
  margin: PropTypes.string,
  padding: PropTypes.string,
  borderRadius: PropTypes.string,
  color: PropTypes.string
};

export default Label;
