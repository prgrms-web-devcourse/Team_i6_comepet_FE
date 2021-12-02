import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { STATUS } from '@/utils/constants';

const StatusTag = ({
  status,
  children,
  padding,
  color,
  bgColor,
  width,
  fontSize,
  borderRadius
}) => {
  return (
    <Wrapper>
      <StyledDiv
        status={status}
        padding={padding}
        bgColor={bgColor}
        color={color}
        width={width}
        fontSize={fontSize}
        borderRadius={borderRadius}>
        {decideText(status, bgColor, children)}
      </StyledDiv>
    </Wrapper>
  );
};

const decideColor = ({ status, bgColor, theme }) => {
  if (bgColor) {
    return bgColor;
  }

  if (status) {
    return theme.colors[status];
  }

  return theme.colors.lighterGray;
};

const decideText = (status, bgColor, children) => {
  if (bgColor && children) {
    return children;
  }

  if ((bgColor && !children) || (!bgColor && children)) return '배경색과 텍스트 둘 다 입력해주세요';

  if (status) {
    return STATUS[status];
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
  status: PropTypes.string,
  padding: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  fontSize: PropTypes.string,
  borderRadius: PropTypes.string
};

export default StatusTag;
