import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import LineBreakWrapper from '../Common/LineBreakWrapper';
import { Label } from '@/components/Label';
import { SelectionBox } from '@/components/SelectionBox';
import { Input } from '@/components/Input';
import { CheckBox } from '@/components/CheckBox';

const PetInformation = ({ margin }) => {
  return (
    <Wrapper margin={margin}>
      <Label forHtml="status" bgColor="brand">
        동물 정보
      </Label>
      <LineBreakWrapper margin="1.8rem 0 0 0">
        <SelectionBox
          id="status"
          options={['실종', '목격', '발견', '완료']}
          defaultOption="반려 동물 종류"
          required={true}
        />
        <SelectionBox
          id="status"
          options={['실종', '목격', '발견', '완료']}
          defaultOption="품종"
          required={true}
          margin="0 0 0 2rem"
        />
        <CheckBox margin="0 0 0 1.6rem" />
        <LineBreakWrapper>
          <InputWrapper width="8rem">
            <Input placeholder="나이" margin="1.8rem 0 0 0" />
          </InputWrapper>
          <CheckBox margin="0 0 0 1.6rem" />
          <SelectionBox
            id="status"
            options={['실종', '목격', '발견', '완료']}
            defaultOption="성별"
            required={true}
            margin="0 0 0 1.6rem"
          />
          <CheckBox margin="0 0 0 1.6rem" />
        </LineBreakWrapper>
      </LineBreakWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: ${({ margin }) => margin};
`;

const InputWrapper = styled.div`
  display: inline-block;
  width: ${({ width }) => width};
`;

PetInformation.propTypes = {
  margin: PropTypes.string
};

export default PetInformation;
