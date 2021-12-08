import React from 'react';
import styled from '@emotion/styled';
import LineBreakWrapper from '../Common/LineBreakWrapper';
import { Label } from '@/components/Label';
import { SelectionBox } from '@/components/SelectionBox';

const Status = () => {
  return (
    <Wrapper>
      <Label forHtml="status" bgColor="brand">
        상태 정보
      </Label>
      <LineBreakWrapper margin="1.8rem 0 0 0">
        <SelectionBox
          id="status"
          options={['실종', '목격', '발견', '완료']}
          defaultOption="상태 옵션"
          required={true}
        />
      </LineBreakWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Status;
