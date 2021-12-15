import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Slider } from '@/components/Slider';
import { ScrapCounter } from '@/components/ScrapCounter';
import { StatusTag } from '@/components/StatusTag';

const imageList = [
  {
    image: 'https://images.unsplash.com/photo-1546190255-451a91afc548?ixlib=rb-1.2.1'
  },
  {
    image: 'https://images.unsplash.com/photo-1591348122449-02525d70379b?ixlib=rb-1.2.1'
  },
  {
    image: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?ixlib=rb-1.2.1'
  },
  {
    image: 'https://images.unsplash.com/photo-1577023311546-cdc07a8454d9?ixlib=rb-1.2.1'
  }
];

const ImageSlider = ({ bookmarkCount, status }) => {
  return (
    <Wrapper>
      <Slider imageList={imageList} borderRadius="1.6rem 1.6rem 0 0" />
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
  status: PropTypes.string
};

export default ImageSlider;
