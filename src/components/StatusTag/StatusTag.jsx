import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { STATUS } from '@/utils/constants';

const StatusTag = ({ as, children, padding, color, bgColor, width, fontSize, borderRadius }) => {
  return (
    <Wrapper>
      <StyledDiv
        padding={padding}
        bgColor={bgColor}
        color={color}
        width={width}
        fontSize={fontSize}
        borderRadius={borderRadius}>
        {decideText(as, bgColor, children)}
      </StyledDiv>
    </Wrapper>
  );
};

const decideColor = ({ as, bgColor, theme }) => {
  if (bgColor) {
    return bgColor;
  }

  if (as) {
    return theme.colors[STATUS[as]];
  }

  return theme.colors.lighterGray;
};

const decideText = (as, bgColor, children) => {
  if (bgColor && children) {
    return children;
  }

  if ((bgColor && !children) || (!bgColor && children)) return '배경색과 텍스트 둘 다 입력해주세요';

  if (as) {
    return STATUS[as];
  }

  return '내용을 입력해 주세요';
};

const Wrapper = styled.div``;

const StyledDiv = styled.div`
  background-color: ${(props) => decideColor(props)};
  padding: ${({ padding }) => padding || '0.6rem'};
  width: ${({ width }) => width || '5.6rem'};
  border-radius: ${({ borderRadius }) => borderRadius || '0 1.6rem'};
  font-size: ${({ fontSize }) => fontSize || '1.6rem'};
  font-weight: bold;
  text-align: center;
  color: ${({ color, theme }) => color || theme.colors.normalWhite};
`;

StatusTag.propTypes = {
  children: PropTypes.string,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  as: PropTypes.string,
  padding: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  fontSize: PropTypes.string,
  borderRadius: PropTypes.string
};

export default StatusTag;
