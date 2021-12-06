import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const FormError = ({ children, isVisible }) => {
  return (
    <Wrapper isVisible={isVisible}>
      <StyledAddCircleIcon />
      <ErrorMessage>{children}</ErrorMessage>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: ${({ isVisible }) => isVisible && 'flex'};
  visibility: ${({ isVisible }) => !isVisible && 'hidden'};
  align-items: center;
  height: 2.8rem;
  margin: 0.4rem 0 0.8rem 0;
  padding: 0 0 0 1.6rem;
  border-radius: 0.4rem;
  background-color: ${({ theme }) => theme.colors.errorBg100};
`;

const StyledAddCircleIcon = styled(AddCircleIcon)`
  transform: rotate(45deg);
  color: ${({ theme }) => theme.colors.errorBg300};
`;

const ErrorMessage = styled.span`
  margin: 0 0 0 0.8rem;
  color: ${({ theme }) => theme.colors.errorBg500};
`;

FormError.propTypes = {
  children: PropTypes.node,
  isVisible: PropTypes.bool
};

export default FormError;
