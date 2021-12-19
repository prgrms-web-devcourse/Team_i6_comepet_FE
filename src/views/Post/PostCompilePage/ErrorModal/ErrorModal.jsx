import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Modal } from '@/components/Modal';

const ErrorModal = ({ onClose, errors }) => {
  return (
    <Modal
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      boxShadow="normal"
      onClose={onClose}>
      <TopWrapper>
        <ErrorHeader>Error!</ErrorHeader>
      </TopWrapper>
      <BottomWrapper>
        {Object.values(errors).map((error, index) => (
          <ErrorText key={index}>{error}</ErrorText>
        ))}
      </BottomWrapper>
    </Modal>
  );
};

const ErrorHeader = styled.div``;

const TopWrapper = styled.div``;

const BottomWrapper = styled.div``;

const ErrorText = styled.div``;

ErrorModal.propTypes = { onClose: PropTypes.func, errors: PropTypes.object };

export default ErrorModal;
