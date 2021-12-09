import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { BackgroundBox } from '@/components/BackgroundBox';
import { STATUS } from '@/utils/constants';

const responseData = {
  missing: 31,
  detection: 5,
  protection: 11,
  completion: 15,
  date: '2021-11-05T16:55:37.436056'
};

const InformationModal = ({ isVisible, place }) => {
  return (
    <Wrapper isVisible={isVisible} place={place}>
      <BackgroundBox width="33rem" height="3rem">
        <TextWrapper>
          {STATUS['missing']} {responseData.missing} 건 중, {responseData.detection} 건{' '}
          {STATUS['detection']} , {responseData.protection} 건 {STATUS['protection']},{' '}
          {responseData.completion} 건 {STATUS['completion']} 되었습니다
        </TextWrapper>
      </BackgroundBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  position: absolute;
  left: ${({ place }) => place === 'left' && '2rem'};
  right: ${({ place }) => place === 'right' && '2rem'};
  top: 6rem;
  z-index: 1000;
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 1.6rem;
`;

InformationModal.propTypes = {
  src: PropTypes.string,
  nickname: PropTypes.string,
  isVisible: PropTypes.bool,
  place: PropTypes.string
};

export default InformationModal;
