import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Slider } from '@/components/Slider';
import { ScrapCounter } from '@/components/ScrapCounter';
import { StatusTag } from '@/components/StatusTag';

const ImageSlider = ({ bookmarkCount, status, postImages }) => {
  return (
    <Wrapper>
      <Slider imageList={postImages} borderRadius="1.6rem 1.6rem 0 0" />
      <ScrapCounterWrapper>
        <ScrapCounter size="medium" isBookmark={false}>
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
  bottom: 0;
`;

const StatusTagWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

ImageSlider.propTypes = {
  bookmarkCount: PropTypes.number,
  status: PropTypes.string,
  postImages: PropTypes.array
};

export default ImageSlider;
