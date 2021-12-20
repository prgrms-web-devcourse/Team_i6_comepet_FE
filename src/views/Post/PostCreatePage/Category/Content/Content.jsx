import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Label } from '@/components/Label';

const Content = ({ margin, onChange }) => {
  const handleInput = (e) => {
    const pureText = e.target.textContent;
    const textWithTags = e.target.innerHTML;
    if (pureText.length !== 0) {
      onChange({ target: { name: 'content', value: textWithTags } });
    } else if (pureText.length === 0) {
      onChange({ target: { name: 'content', value: null } });
    }
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

  return (
    <Wrapper margin={margin}>
      <Label forHtml="status" bgColor="brand">
        내용
      </Label>
      <ContentEditor
        margin="1.8rem 0 0 0"
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        contentEditable
        onPaste={handlePaste}
        placeholder="내용을 입력해주세요"
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: ${({ margin }) => margin};
`;

const ContentEditor = styled.div`
  width: ${({ width }) => width || '100%'};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding || '2rem'};
  border: ${({ border }) => border || '0'};
  border-radius: ${({ borderRadius }) => borderRadius || '1rem'};
  font-size: ${({ fontSize }) => fontSize || '1.6rem'};
  box-shadow: 0 0.4rem 1.6rem rgba(0, 0, 0, 0.08);
  outline: none;

  &:empty:before {
    content: attr(placeholder);
    color: ${({ theme }) => theme.colors.normalRed};
    display: inline-block;
    opacity: 0.5;
  }
`;

Content.propTypes = {
  margin: PropTypes.string,
  onChange: PropTypes.func
};

export default Content;
