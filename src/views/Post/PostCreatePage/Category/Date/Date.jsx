import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import LineBreakWrapper from '../Common/LineBreakWrapper';
import { Label } from '@/components/Label';
import { SelectionBox } from '@/components/SelectionBox';

const Date = ({ margin }) => {
  return (
    <Wrapper margin={margin}>
      <Label forHtml="status" bgColor="brand">
        날짜
      </Label>
      <LineBreakWrapper margin="1.8rem 0 0 0">
        <SelectionBox
          id="status"
          options={['실종', '목격', '발견', '완료']}
          defaultOption="년"
          required={true}
        />
        <SelectionBox
          id="status"
          options={['실종', '목격', '발견', '완료']}
          defaultOption="월"
          required={true}
          margin="0 0 0 2rem"
        />
        <SelectionBox
          id="status"
          options={['실종', '목격', '발견', '완료']}
          defaultOption="일"
          required={true}
          margin="0 0 0 2rem"
        />
      </LineBreakWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: ${({ margin }) => margin};
`;

Date.propTypes = {
  margin: PropTypes.string
};

export default Date;
