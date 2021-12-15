import React from 'react';
import styled from '@emotion/styled';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const CommentCreate = () => {
  const handleInput = (e) => {
    const onlyText = e.target.textContent;
    const textWithTags = e.target.innerHTML;
    console.log(onlyText, textWithTags);
    // onChange({ target: { name: 'content', value: textWithTags } });
  };

  const handleKeyDown = (e) => {
    if (e.target.textContent.length >= 255 && e.key !== 'Backspace') {
      e.preventDefault();
      return;
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
  };

  // TODO: 댓글 입력창 contentEditable로 변경
  return (
    <Wrapper>
      {/* <Input placeholder="댓글을 입력해주세요" /> */}
      <ContentEditor
        margin="1.8rem 0 0 0"
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        contentEditable
        onPaste={handlePaste}
        placeholder="내용을 입력해주세요"
        padding="1.5rem"
      />
      <Button>
        <StyledArrowCircleRightIcon />
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const ContentEditor = styled.div`
  width: ${({ width }) => width || '100%'};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding || '2rem'};
  border: ${({ border }) => border || '0'};
  border-radius: ${({ borderRadius }) => borderRadius || '1rem'};
  background-color: #fafafa;
  font-size: ${({ fontSize }) => fontSize || '1.6rem'};
  box-shadow: 0 0.4rem 1.6rem rgba(0, 0, 0, 0.08);
  outline: none;
  &:empty:before {
    content: attr(placeholder);
    opacity: 0.5;
  }
`;

const StyledArrowCircleRightIcon = styled(ArrowCircleRightIcon)`
  font-size: 4.5rem;
  transform: rotate(-90deg);
  color: ${({ theme }) => theme.colors.normalOrange};
`;

const Button = styled.button`
  position: absolute;
  z-index: 1;
  right: 0.3rem;
  bottom: 0;
`;

CommentCreate.propTypes = {};

export default CommentCreate;
