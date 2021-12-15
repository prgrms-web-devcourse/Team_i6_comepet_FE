import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import LineBreakWrapper from '../Common/LineBreakWrapper';
import { Label } from '@/components/Label';
import { SelectionBox } from '@/components/SelectionBox';

const Status = ({ onChange }) => {
  const handleChange = (e) => {
    if (!isDefalutOptionSelected(e)) {
      onChange({ target: { name: 'status', value: e.target.value } });
    } else {
      onChange({ target: { name: 'status', value: null } });
    }
  };

  return (
    <Wrapper>
      <Label forHtml="status" bgColor="brand" size="xsmall">
        상태 정보
      </Label>
      <LineBreakWrapper margin="0.8rem 0 0 0">
        <SelectionBox
          id="status"
          onChange={handleChange}
          options={['실종', '목격', '발견', '완료']}
          defaultOption="상태 옵션"
          required
          fontSize="1.2rem"
        />
      </LineBreakWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

Status.propTypes = {
  onChange: PropTypes.func
};

export default Status;
const isDefalutOptionSelected = (e) => e.target[0].textContent === e.target.value;
