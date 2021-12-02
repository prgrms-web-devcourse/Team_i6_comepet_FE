import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import StarIcon from '@mui/icons-material/Star';

const ScrapCounter = ({ children, size }) => {
  return (
    <Wrapper size={size}>
      <StyledStarIcon size={size} />
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

const Counter = styled.span`
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
  children: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired
};

export default ScrapCounter;
