import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { BackgroundBox } from '@/components/BackgroundBox';
import { STATUS } from '@/utils/constants';
import { GET } from '@/apis/axios';
import useSWR from 'swr';

const InformationModal = ({ isVisible, top, left, right, bottom }) => {
  const { data } = useSWR('/statistics', GET);

  // TODO: useBlockScroll 사용하면 에러
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'visible';
    };
  });

  return (
    <Wrapper isVisible={isVisible} top={top} left={left} right={right} bottom={bottom}>
      <BackgroundBox width="36rem" height="6rem">
        <TextWrapper>
          {STATUS['MISSING']} {data?.missing}건 / {STATUS['DETECTION']} {data?.detection}건 /{' '}
          {STATUS['PROTECTION']} {data?.protection}건 / {STATUS['COMPLETION']} {data?.completion}건
        </TextWrapper>
      </BackgroundBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  bottom: ${({ bottom }) => bottom};
  right: ${({ right }) => right};
  z-index: 1001;
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.2rem;
  width: 100%;
  height: 100%;
  font-size: 1.6rem;
  line-height: 2rem;
`;

InformationModal.propTypes = {
  src: PropTypes.string,
  nickname: PropTypes.string,
  isVisible: PropTypes.bool,
  place: PropTypes.string,
  top: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string,
  bottom: PropTypes.string
};

export default InformationModal;
