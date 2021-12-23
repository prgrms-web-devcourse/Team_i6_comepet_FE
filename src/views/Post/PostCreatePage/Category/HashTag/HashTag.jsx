import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Label } from '@/components/Label';
import { Input } from '@/components/Input';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

const HashTag = ({ margin, onChange }) => {
  const [tags, setTags] = useState([]);
  const [error, setErrors] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleEnter = (e) => {
    if (
      e.key === 'Enter' &&
      inputValue.length !== 0 &&
      inputValue.length <= 5 &&
      tags.length <= 5
    ) {
      setErrors('');
      handleAppendTag(inputValue);

      setInputValue('');
    }

    if (e.key === 'Enter' && (e.target.value.length > 5 || tags.length >= 6)) {
      setErrors('5글자씩 총 6개까지만 입력이 가능합니다');
    }
  };

  const handleDelete = (e) => {
    const nextTags = [...tags].filter(
      ({ name }) => '#' + name !== e.currentTarget.previousSibling.textContent
    );

    setTags(nextTags);
    onChange({ target: { name: 'tags', value: nextTags } });
  };

  const handleAppendTag = (nextTag) => {
    const nextTags = [...tags];
    nextTags.push({ name: `${nextTag}` });
    setTags(nextTags);
    onChange({ target: { name: 'tags', value: nextTags } });
  };

  return (
    <Wrapper margin={margin}>
      <Label forHtml="status" bgColor="brand">
        해쉬태그 입력
      </Label>
      <Input
        placeholder="해쉬태그 입력 후 엔터를 눌러주세요"
        margin="1.8rem 0 1.8rem 0"
        onChange={handleInput}
        onKeyPress={handleEnter}
        value={inputValue}
      />
      <Error error={error}>{error}</Error>
      <HashTagWrapper>
        <TagList>
          {tags.map(({ name }, index) => (
            <TagWrapper key={index}>
              <Tag>#{name}</Tag>
              <Button onClick={handleDelete} type="button">
                <StyledCancelRoundedIcon />
              </Button>
            </TagWrapper>
          ))}
        </TagList>
      </HashTagWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: ${({ margin }) => margin};
`;

const Error = styled.div`
  visibility: ${({ error }) => (error.length && 'visible') || 'hidden'};
  margin: 0 0 0 0.8rem;
  color: ${({ theme }) => theme.colors.normalRed};
  font-size: 1.2rem;
`;

const HashTagWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 0 0.8rem;
`;

const TagWrapper = styled.li`
  display: flex;
  align-items: center;
  margin: 0.6rem 0.6rem 0 0;
`;

const Tag = styled.div`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.normalGreen};
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  margin: 0 0 0 0.6rem;
  padding: 0;
  color: ${({ theme }) => theme.colors.normalGreen};

  :hover {
    color: ${({ theme }) => theme.colors.normalRed};
  }
`;

const StyledCancelRoundedIcon = styled(CancelRoundedIcon)``;

HashTag.propTypes = {
  margin: PropTypes.string,
  onChange: PropTypes.func
};

export default HashTag;
