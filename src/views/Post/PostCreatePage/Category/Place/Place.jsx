import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import LineBreakWrapper from '../Common/LineBreakWrapper';
import { Label } from '@/components/Label';
import { SelectionBox } from '@/components/SelectionBox';
import { Input } from '@/components/Input';

const Place = ({ margin }) => {
  return (
    <Wrapper margin={margin}>
      <Label forHtml="status" bgColor="brand">
        장소
      </Label>
      <LineBreakWrapper margin="1.8rem 0 0 0">
        <SelectionBox
          id="status"
          options={['실종', '목격', '발견', '완료']}
          defaultOption="시/도"
          required={true}
        />
        <SelectionBox
          id="status"
          options={['실종', '목격', '발견', '완료']}
          defaultOption="시/군/구"
          required={true}
          margin="0 0 0 2rem"
        />
        <Input placeholder="추가적인 정보를 적어주세요" margin="1.8rem 0 0 0" />
      </LineBreakWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: ${({ margin }) => margin};
`;

Place.propTypes = {
  margin: PropTypes.string
};

export default Place;
