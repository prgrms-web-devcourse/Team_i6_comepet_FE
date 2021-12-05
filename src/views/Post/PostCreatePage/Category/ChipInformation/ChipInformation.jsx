import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Label } from '@/components/Label';
import { Input } from '@/components/Input';

const ChipInformation = ({ margin }) => {
  return (
    <Wrapper margin={margin}>
      <Label forHtml="status" bgColor="brand">
        칩번호
      </Label>
      <Input placeholder="칩번호를 입력해 주세요" margin="1.8rem 0 0 0" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: ${({ margin }) => margin};
`;

ChipInformation.propTypes = {
  margin: PropTypes.string
};

export default ChipInformation;
