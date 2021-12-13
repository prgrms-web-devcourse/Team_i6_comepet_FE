import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { BackgroundBox } from '@/components/BackgroundBox';
import { Button } from '@/components/Button';
import { Image } from '@/components/Image';
import { NotificationModal, SidebarModal } from './PopupModal';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { getImageSrc } from '@/utils/helpers';

const ShortHeader = ({ isLoggedIn = true, location = 'Comepet' }) => {
  const [isNotificationModalVisible, setIsNotificationModalVisible] = useState(false);
  const [isSidebarModalVisible, setIsSidebarModalVisible] = useState(false);

  const closeAllModalsExceptFor = (targetModal) => {
    if (isSidebarModalVisible && !targetModal) {
      setIsSidebarModalVisible(!isSidebarModalVisible);
      return;
    }

    if (isNotificationModalVisible && !targetModal) {
      setIsNotificationModalVisible(!isNotificationModalVisible);
      return;
    }
  };

  const handleSidebarModalClick = () => {
    closeAllModalsExceptFor(isSidebarModalVisible);
    setIsSidebarModalVisible(!isSidebarModalVisible);
  };

  const handleNotificationModalClick = () => {
    closeAllModalsExceptFor(isNotificationModalVisible);
    setIsNotificationModalVisible(!isNotificationModalVisible);
  };

  return (
    <Wrapper>
      <BackgroundBox borderRadius="0 0 1.6rem 1.6rem" height="5.2rem">
        <TopWrapper>
          <StyledArrowBackIosNewIcon />
          <StyledHeader>{location}</StyledHeader>
          {isLoggedIn ? (
            <IconWrapper>
              <StyledNotificationIconButton onClick={handleNotificationModalClick}>
                <StyledNotificationsIcon />
                <StyledBadge />
              </StyledNotificationIconButton>
              <StyledMenuIconButton onClick={handleSidebarModalClick}>
                <StyledMenuIcon />
              </StyledMenuIconButton>
            </IconWrapper>
          ) : (
            <Button
              bgColor="normalWhite"
              type="button"
              width="2.8rem"
              height="2.8rem"
              borderRadius="50%">
              <Image
                src={getImageSrc('/images/profile-image-loggedout.svg')}
                alt="로그인"
                width="2.8rem"
                height="2.8rem"
                type="profile"
                margin="0.5rem 0 0 0 "
              />
            </Button>
          )}
        </TopWrapper>
      </BackgroundBox>
      <NotificationModal isVisible={isNotificationModalVisible} top="5rem" right="3rem" />
      <SidebarModal isVisible={isSidebarModalVisible} top="5rem" right="2rem" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
`;

const TopWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2.4rem;
`;

const StyledHeader = styled.h1`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.brand};
  cursor: pointer;
`;

const StyledMenuIconButton = styled.button`
  margin-left: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  cursor: pointer;
`;

const StyledMenuIcon = styled(MenuIcon)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.brand};
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledNotificationIconButton = styled.button`
  padding: 0;
  position: relative;
`;

const StyledNotificationsIcon = styled(NotificationsIcon)`
  font-size: 2.8rem;
  color: ${({ theme }) => theme.colors.brand};
`;

const StyledBadge = styled.div`
  position: absolute;
  right: 0.3rem;
  top: 0.3rem;
  width: 0.5rem;
  height: 0.5rem;
  background-color: red;
  border-radius: 50%;
`;

const StyledArrowBackIosNewIcon = styled(ArrowBackIosNewIcon)`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.brand};
  cursor: pointer;
`;

ShortHeader.propTypes = {
  isLoggedIn: PropTypes.bool,
  location: PropTypes.string
};

export default ShortHeader;
