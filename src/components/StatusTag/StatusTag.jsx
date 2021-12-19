import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { STATUS } from '@/utils/constants';
import { DEV_ERROR } from '@/utils/constants';

const StatusTag = ({
  status,
  children,
  padding,
  color,
  bgColor,
  fontSize,
  borderRadius,
  width,
  height
}) => {
  if (isWronglyUsed(status, bgColor, children)) {
    console.error(DEV_ERROR.INVALID_PROP);
    return;
  }

  return (
    <Wrapper
      padding={padding}
      status={status}
      bgColor={bgColor}
      color={color}
      fontSize={fontSize}
      borderRadius={borderRadius}
      width={width}
      height={height}>
      {STATUS[status] || children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  width: ${({ theme }) => theme.sizes.statusTag.wrapper.small.width};
  height: ${({ theme }) => theme.sizes.statusTag.wrapper.small.height};
  background-color: ${(props) => decideColor(props)};
  border-radius: ${({ borderRadius }) => borderRadius || '0 1.6rem'};
  font-size: ${({ fontSize }) => fontSize || '1.6rem'};
  font-weight: bold;
  text-align: center;
  color: ${({ color, theme }) => color || theme.colors.normalWhite};
  opacity: 90%;
`;

StatusTag.propTypes = {
  children: PropTypes.number,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  status: PropTypes.string,
  padding: PropTypes.string,
  fontSize: PropTypes.string,
  borderRadius: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
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
