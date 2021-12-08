import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Label } from '@/components/Label';
import { Input } from '@/components/Input';

const Contact = ({ margin }) => {
  return (
    <Wrapper margin={margin}>
      <Label forHtml="status" bgColor="brand">
        연락처
      </Label>
      <Input placeholder="연락처 정보를 적어주세요" margin="1.8rem 0 0 0" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: ${({ margin }) => margin};
`;

Contact.propTypes = {
  margin: PropTypes.string
};

export default Contact;
