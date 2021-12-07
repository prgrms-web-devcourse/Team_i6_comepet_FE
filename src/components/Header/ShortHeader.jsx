import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { BackgroundBox } from '@/components/BackgroundBox';
import { Button } from '@/components/Button';
import { Image } from '@/components/Image';
import SidebarButton from './SidebarButton';
import NotificationButton from './NotificationButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const MShortHeader = ({ isLoggedIn = true }) => {
  return (
    <Wrapper>
      <BackgroundBox borderRadius="0 0 1.6rem 1.6rem" height="5rem">
        <TopContainer>
          <StyledArrowBackIosNewIcon />
          <StyledHeader>Comepet</StyledHeader>
          {isLoggedIn ? (
            <IconContainer>
              <NotificationButton />
              <SidebarButton />
            </IconContainer>
          ) : (
            <Button
              bgColor="normalWhite"
              type="button"
              width="2.8rem"
              height="2.8rem"
              borderRadius="50%"
              margin="0 1rem 0 0">
              <Image alt="로그인" width="2.8rem" height="2.8rem" type="profile" />
            </Button>
          )}
        </TopContainer>
      </BackgroundBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledHeader = styled.h1`
  margin-left: 4.2rem;
  color: ${({ theme }) => theme.colors.brand};
  cursor: pointer;
`;

const IconContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-right: 1.2rem;
`;

const StyledArrowBackIosNewIcon = styled(ArrowBackIosNewIcon)`
  font-size: 2rem;
  margin-left: 1rem;
  color: ${({ theme }) => theme.colors.brand};
  cursor: pointer;
`;

MShortHeader.propTypes = {
  isLoggedIn: PropTypes.bool
};

export default MShortHeader;
