import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Label } from '@/components/Label';
import { Input } from '@/components/Input';

const HashTag = ({ margin }) => {
  return (
    <Wrapper margin={margin}>
      <Label forHtml="status" bgColor="brand">
        해쉬태그 입력
      </Label>
      <Input placeholder="해쉬태그 입력 후 엔터를 눌러주세요" margin="1.8rem 0 0 0" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: ${({ margin }) => margin};
`;

HashTag.propTypes = {
  margin: PropTypes.string
};

export default HashTag;
