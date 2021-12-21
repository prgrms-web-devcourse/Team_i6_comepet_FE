import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Slider } from '@/components/Slider';
import { ScrapCounter } from '@/components/ScrapCounter';
import { StatusTag } from '@/components/StatusTag';

const ImageSlider = ({ bookmarkCount, isBookmark, status, images, onClickBookmark }) => {
  return (
    <Wrapper>
      <Slider imageList={images} borderRadius="1.6rem 1.6rem 0 0" />
      <ScrapCounterWrapper>
        <ScrapCounter size="medium" isBookmark={isBookmark} onClick={onClickBookmark}>
          {bookmarkCount}
        </ScrapCounter>
      </ScrapCounterWrapper>
      <StatusTagWrapper>
        <StatusTag status={status} />
      </StatusTagWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 20.4rem;
`;

const ScrapCounterWrapper = styled.div`
  position: absolute;
  right: 0;
  bottom: -0.3rem;
`;

const StatusTagWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

ImageSlider.propTypes = {
  bookmarkCount: PropTypes.number,
  status: PropTypes.string,
  images: PropTypes.array,
  isBookmark: PropTypes.bool,
  onClickBookmark: PropTypes.func
};

export default ImageSlider;
