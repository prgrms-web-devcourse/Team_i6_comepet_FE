import React from 'react';
import styled from '@emotion/styled';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const CommentCreate = () => {
  // TODO: 댓글 입력창 contentEditable로 변경
  return (
    <Wrapper>
      <StyledInput placeholder="댓글을 입력해주세요" />
      <StyledArrowCircleRightIcon />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 4.3rem;
  padding: 1.5rem;
  background-color: #fafafa;
`;

const StyledArrowCircleRightIcon = styled(ArrowCircleRightIcon)`
  position: absolute;
  right: 0.3rem;
  font-size: 4.5rem;
  transform: rotate(-90deg);
  color: ${({ theme }) => theme.colors.normalOrange};
`;

CommentCreate.propTypes = {};

export default CommentCreate;
