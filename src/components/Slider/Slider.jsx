import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import Dots from './Dots';
import SliderButton from './SliderButton';
import { Image } from '@/components/Image';

const Slider = ({ imageList, borderRadius }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const imageLength = imageList?.length || 0;

  const switchImageBy = (index) => {
    const isCurrentImage = index === slideIndex;

    if (isCurrentImage) {
      return 1;
    }

    return 0;
  };

  const handleDotClick = ({ target }) => {
    const dotId = Number(target.id);
    setSlideIndex(dotId);
  };

  const handlePrevSlide = () => {
    setSlideIndex(slideIndex - 1);

    const endIndex = 0;
    const isReachingEnd = slideIndex === endIndex;
    const imageEndIndex = imageLength - 1;

    if (isReachingEnd) {
      setSlideIndex(imageEndIndex);
    }
  };

  const handleNextSlide = () => {
    setSlideIndex(slideIndex + 1);

    const endIndex = imageLength - 1;
    const isReachingEnd = slideIndex === endIndex;
    const ImageBeginIndex = 0;

    if (isReachingEnd) {
      setSlideIndex(ImageBeginIndex);
    }
  };

  return (
    <Wrapper borderRadius={borderRadius}>
      {(imageLength > 0 &&
        imageList.map(({ image, name }, index) => (
          <ImageWrapper key={index} opacity={switchImageBy(index)}>
            <Image src={image || name} width="100%" height="100%" />
          </ImageWrapper>
        ))) || <Image width="100%" height="100%" />}
      <DotContainer>
        <Dots length={imageLength} targetIndex={slideIndex} handleClick={handleDotClick} />
      </DotContainer>
      {imageLength > 1 && (
        <>
          <SliderButton direction="left" handleSlide={handlePrevSlide} />
          <SliderButton direction="right" handleSlide={handleNextSlide} />
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: ${({ borderRadius }) => borderRadius};
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  position: absolute;
  transition: opacity ease-in-out 0.2s;
  opacity: ${({ opacity }) => opacity};
`;

const DotContainer = styled.div`
  position: absolute;
  padding: 0;
  bottom: 0.5rem;
  left: 50%;
  transform: translate(-50%);
`;

Slider.propTypes = {
  imageList: PropTypes.array.isRequired,
  borderRadius: PropTypes.string
};

export default Slider;
