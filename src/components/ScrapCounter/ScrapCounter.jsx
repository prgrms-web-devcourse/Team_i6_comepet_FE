import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { isNotValidSize } from '@/utils/helpers';
import { DEV_ERROR } from '@/utils/constants';

const ScrapCounter = ({ children, size, isBookmark }) => {
  if (isNotValidSize(size, ['small', 'medium'])) {
    console.error(DEV_ERROR.INVALID_PROP);
    return;
  }

  return (
    <Wrapper size={size}>
      {isBookmark ? <StyledStarIcon size={size} /> : <StyledStarBorderIcon size={size} />}
      <Counter size={size}>{children}</Counter>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: ${({ theme, size }) => theme.sizes.scrapCounter.wrapper[size].width};
  height: ${({ theme, size }) => theme.sizes.scrapCounter.wrapper[size].height};
  border-radius: 0.4rem 0 0 0;
  padding: 0 0.4rem 0 0.2rem;
  background-color: ${({ theme }) => theme.colors.normalBlack};
  opacity: 90%;
`;

const StyledStarIcon = styled(StarIcon)`
  width: ${({ theme, size }) => theme.sizes.scrapCounter.icon[size]};
  height: ${({ theme, size }) => theme.sizes.scrapCounter.icon[size]};
  color: #fecc00;
`;

const StyledStarBorderIcon = styled(StarBorderIcon)`
  width: ${({ theme, size }) => theme.sizes.scrapCounter.icon[size]};
  height: ${({ theme, size }) => theme.sizes.scrapCounter.icon[size]};
  color: #fecc00;
`;

const Counter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ theme, size }) => theme.sizes.scrapCounter.icon[size]};
  height: ${({ theme, size }) => theme.sizes.scrapCounter.icon[size]};
  margin-top: 5%;
  font-size: ${({ theme, size }) => theme.sizes.scrapCounter.font[size]};
  color: ${({ theme }) => theme.colors.normalWhite};
`;

ScrapCounter.propTypes = {
  children: PropTypes.number.isRequired,
  size: PropTypes.string.isRequired,
  isBookmark: PropTypes.string.bool
};

export default ScrapCounter;
