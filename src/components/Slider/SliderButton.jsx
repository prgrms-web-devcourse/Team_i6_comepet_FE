import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Button } from '@/components/Button';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

const SliderButton = ({ direction, handleSlide }) => {
  return (
    <Button
      bgColor="transparent"
      borderRadius="50%"
      padding="0"
      width="3rem"
      height="3rem"
      position="absolute"
      top="43%"
      left={(direction === 'left' && '1rem') || 'auto'}
      right={(direction === 'right' && '1rem') || 'auto'}
      direction={direction}
      onClick={handleSlide}>
      {(direction === 'right' && <NextArrow />) || (direction === 'left' && <PrevArrow />)}
    </Button>
  );
};

const NextArrow = styled(ArrowDropDownCircleIcon)`
  transform: rotate(-90deg);
  color: rgba(0, 0, 0, 0.7);
  font-size: 3rem;
`;

const PrevArrow = styled(ArrowDropDownCircleIcon)`
  transform: rotate(90deg);
  color: rgba(0, 0, 0, 0.7);
  font-size: 3rem;
`;

SliderButton.propTypes = {
  direction: PropTypes.string,
  handleSlide: PropTypes.func
};

export default SliderButton;
