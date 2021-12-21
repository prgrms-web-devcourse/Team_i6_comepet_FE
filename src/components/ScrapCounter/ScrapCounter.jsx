import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { isValidProp } from '@/utils/helpers';
import { DEV_ERROR } from '@/utils/constants';

const ScrapCounter = ({ children, size, isBookmark, onClick }) => {
  if (!isValidProp(size, ['small', 'medium'])) {
    console.error(DEV_ERROR.INVALID_PROP);
    return;
  }

  return (
    <Wrapper size={size}>
      <StyledButton type="button" onClick={onClick}>
        {isBookmark ? <StyledStarIcon size={size} /> : <StyledStarBorderIcon size={size} />}
      </StyledButton>
      <Counter size={size}>{children}</Counter>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  right: 0;
  bottom: 0.3rem;
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

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0;
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
  isBookmark: PropTypes.bool,
  onClick: PropTypes.func
};

export default ScrapCounter;
