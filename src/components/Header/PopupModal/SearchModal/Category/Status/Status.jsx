import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import LineBreakWrapper from '../LineBreakWrapper/LineBreakWrapper';
import { Label } from '@/components/Label';
import { SelectionBox } from '@/components/SelectionBox';

const STATUS = Object.freeze({
  실종: 'MISSING',
  목격: 'DETECTION',
  보호: 'PROTECTION',
  완료: 'COMPLETION'
});

const Status = ({ onSelectOption, display }) => {
  const handleChange = (e) => {
    if (!isDefalutOptionSelected(e)) {
      onSelectOption({ status: STATUS[e.target.value] });
    } else {
      onSelectOption({ status: null });
    }
  };

  return (
    <Wrapper display={display}>
      <Label forHtml="status" bgColor="brand" size="xsmall">
        상태 정보
      </Label>
      <LineBreakWrapper margin="0.8rem 0 0 0">
        <SelectionBox
          id="status"
          onChange={handleChange}
          options={['실종', '보호', '목격', '완료']}
          defaultOption="상태 옵션"
          fontSize="1.2rem"
        />
      </LineBreakWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: ${({ display }) => display};
`;

Status.propTypes = {
  onSelectOption: PropTypes.func,
  display: PropTypes.string
};

export default Status;
const isDefalutOptionSelected = (e) => e.target[0].textContent === e.target.value;
