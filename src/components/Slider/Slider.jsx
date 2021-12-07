import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import Dots from './Dots';
import SliderButton from './SliderButton';
import { Image } from '@/components/Image';

const Slider = ({ imageList, size }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const prevSlide = () => {
    if (slideIndex !== 0) {
      setSlideIndex(slideIndex - 1);
    }

    if (slideIndex === 0) {
      setSlideIndex(imageList.length - 1);
    }
  };

  const nextSlide = () => {
    if (slideIndex !== imageList.length) {
      setSlideIndex(slideIndex + 1);
    }

    if (slideIndex === imageList.length - 1) {
      setSlideIndex(0);
    }
  };

  const handleClick = ({ target }) => {
    setSlideIndex(Number(target.id));
  };

  return (
    <Wrapper size={size}>
      {imageList.map(({ image }, index) => (
        <ImageWrapper key={index} opacity={(index === slideIndex && 1) || 0}>
          <Image src={image} width="100%" height="100%" />
        </ImageWrapper>
      ))}
      <DotContainer>
        <Dots length={imageList.length} targetIndex={slideIndex} handleClick={handleClick} />
      </DotContainer>
      <SliderButton direction="left" handleSlide={prevSlide} />
      <SliderButton direction="right" handleSlide={nextSlide} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: ${({ theme, size }) => theme.sizes.slider.wrapper[size].width};
  height: ${({ theme, size }) => theme.sizes.slider.wrapper[size].height};
  position: relative;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  opacity: ${({ opacity }) => opacity};
  transition: opacity ease-in-out 0.4s;
  position: absolute;
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
  size: PropTypes.string
};

export default Slider;
