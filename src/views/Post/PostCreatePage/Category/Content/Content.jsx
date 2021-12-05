import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Label } from '@/components/Label';
import { Input } from '@/components/Input';

const Content = ({ margin }) => {
  return (
    <Wrapper margin={margin}>
      <Label forHtml="status" bgColor="brand">
        내용
      </Label>
      <Input placeholder="내용을 입력해주세요" margin="1.8rem 0 0 0" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: ${({ margin }) => margin};
`;

Content.propTypes = {
  margin: PropTypes.string
};

export default Content;
