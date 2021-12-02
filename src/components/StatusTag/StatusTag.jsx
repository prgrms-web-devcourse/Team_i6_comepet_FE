import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { STATUS } from '@/utils/constants';
import { DEV_ERROR } from '@/utils/constants';

const StatusTag = ({ status, children, padding, color, bgColor, fontSize, borderRadius }) => {
  if (isWronglyUsed(status, bgColor, children)) {
    console.error(DEV_ERROR.INVALID_PROP);
    return;
  }

  return (
    <Wrapper>
      <StyledSpan
        padding={padding}
        status={status}
        bgColor={bgColor}
        color={color}
        fontSize={fontSize}
        borderRadius={borderRadius}>
        {STATUS[status] || children}
      </StyledSpan>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const StyledSpan = styled.span`
  background-color: ${(props) => decideColor(props)};
  padding: ${({ padding }) => padding || '0.6rem'};
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
  fontSize: PropTypes.string,
  borderRadius: PropTypes.string
};

export default StatusTag;

const isWronglyUsed = (status, bgColor, children) => {
  return (
    (status && (XOR(bgColor, children) || AND(bgColor, children))) ||
    (!status && (XOR(bgColor, children) || NAND(bgColor, children)))
  );
};

const XOR = (a, b) => (!a && b) || (a && !b);
const AND = (a, b) => a && b;
const NAND = (a, b) => !(a && b);

const decideColor = ({ status, bgColor, theme }) => {
  if (bgColor) {
    return bgColor;
  }

  if (status) {
    return theme.colors[status];
  }

  return theme.colors.lighterGray;
};
