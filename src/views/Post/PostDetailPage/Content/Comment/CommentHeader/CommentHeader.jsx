import React from 'react';
import styled from '@emotion/styled';

const CommentHeader = () => {
  return (
    <Wrapper>
      <CommentCount>
        댓글 <TextHighLight color="normalGreen">2,300</TextHighLight>개
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

CommentHeader.propTypes = {};

export default CommentHeader;
