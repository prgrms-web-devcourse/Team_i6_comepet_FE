import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const StatusTag = ({ children, padding, backgroundColor, width, fontSize, borderRadius }) => {
  return (
    <Wrapper>
      <StyledDiv
        padding={padding}
        backgroundColor={backgroundColor}
        width={width}
        fontSize={fontSize}
        borderRadius={borderRadius}>
        {children}
      </StyledDiv>
    </Wrapper>
  );
};

const StyledDiv = styled.div`
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: ${({ padding }) => padding};
  width: ${({ width }) => width};
  text-align: center;
  font-size: ${({ fontSize }) => fontSize};
  border-radius: ${({ borderRadius }) => borderRadius};
`;

const Wrapper = styled.div``;

StatusTag.defaultProps = {
  children: '상태 없음',
  padding: '0.6rem 0.6rem',
  backgroundColor: '#ADADAD',
  width: '5.6rem',
  fontSize: '1.6rem',
  borderRadius: '0 1.6rem 0 1.6rem'
};

StatusTag.propTypes = {
  children: PropTypes.string,
  padding: PropTypes.string,
  backgroundColor: PropTypes.string,
  width: PropTypes.string,
  fontSize: PropTypes.string,
  borderRadius: PropTypes.string
};

export default StatusTag;
