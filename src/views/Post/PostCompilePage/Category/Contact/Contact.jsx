import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Label } from '@/components/Label';
import { Input } from '@/components/Input';

const Contact = ({ margin, onChange }) => {
  const handleInput = (e) => {
    if (e.target.value.length > 0) {
      onChange({ target: { name: 'telNumber', value: e.target.value } });
    } else if (e.target.value.length === 0) {
      onChange({ target: { name: 'telNumber', value: null } });
    }
  };

  return (
    <Wrapper margin={margin}>
      <Label forHtml="status" bgColor="brand">
        연락처
      </Label>
      <Input
        onChange={handleInput}
        placeholder="연락처 정보를 적어주세요"
        maxLength="15"
        margin="1.8rem 0 0 0"
        required
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: ${({ margin }) => margin};
`;

Contact.propTypes = {
  margin: PropTypes.string,
  onChange: PropTypes.func
};

export default Contact;
