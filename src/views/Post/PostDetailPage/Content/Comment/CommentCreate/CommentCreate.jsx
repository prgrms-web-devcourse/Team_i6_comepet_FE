import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

const CommentCreate = ({ onChange }) => {
  const [input, setInput] = useState('');
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const contentEditorRef = useRef(null);

  const handleInput = async (e) => {
    const textWithTags = e.target.innerHTML;
    setInput(textWithTags);
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

  const handleNavigateToLoginPage = () => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  };

  return (
    <Wrapper onClickCapture={handleNavigateToLoginPage}>
      <ContentEditor
        margin="1.8rem 0 0 0"
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        contentEditable={isLoggedIn}
        onPaste={handlePaste}
        placeholder={
          (isLoggedIn && '내용을 입력해주세요 (최대 255글자)') || (!isLoggedIn && '로그인 해주세요')
        }
        padding="1.5rem"
        ref={contentEditorRef}
      />
      <Button
        onClick={() => {
          onChange(input);
          setInput('');
          contentEditorRef.current.textContent = '';
        }}>
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

CommentCreate.propTypes = {
  onChange: PropTypes.func
};

export default CommentCreate;
