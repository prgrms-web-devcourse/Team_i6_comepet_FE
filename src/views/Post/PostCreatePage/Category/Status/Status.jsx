import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import LineBreakWrapper from '../Common/LineBreakWrapper';
import { Label } from '@/components/Label';
import { SelectionBox } from '@/components/SelectionBox';

const STATUS = Object.freeze({
  실종: 'MISSING',
  목격: 'DETECTION',
  보호: 'PROTECTION',
  완료: 'COMPLETION'
});

const Status = ({ onChange }) => {
  const handleChange = (e) => {
    if (!isDefalutOptionSelected(e)) {
      onChange({ target: { name: 'status', value: STATUS[e.target.value] } });
    } else {
      onChange({ target: { name: 'status', value: null } });
    }
  };

  return (
    <Wrapper>
      <Label forHtml="status" bgColor="brand">
        상태 정보
      </Label>
      <LineBreakWrapper margin="1.8rem 0 0 0">
        <SelectionBox
          id="status"
          onChange={handleChange}
          options={['실종', '목격', '보호', '완료']}
          defaultOption="상태 옵션"
          required
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
