import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const CommentHeader = ({ commentCount }) => {
  return (
    <Wrapper>
      <CommentCount>
        댓글 <TextHighLight color="normalGreen">{commentCount}</TextHighLight>개
      </CommentCount>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 1rem 1.6rem;
`;

const CommentCount = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
`;

const TextHighLight = styled.span`
  color: ${({ theme, color }) => theme.colors[color]};
`;

CommentHeader.propTypes = {
  commentCount: PropTypes.number
};

export default CommentHeader;
