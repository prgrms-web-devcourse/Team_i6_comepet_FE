import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { BackgroundBox } from '@/components/BackgroundBox';
import { NotificationModal, SidebarModal } from './PopupModal';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import useAuth from '@/hooks/useAuth';

const ShortHeader = ({ location = 'Comepet' }) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

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

  const handleGoBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <Wrapper>
      <BackgroundBox borderRadius="0 0 1.6rem 1.6rem" height="5.2rem">
        <TopWrapper>
          <StyledArrowBackIosNewIconButton type="button" onClick={handleGoBackButtonClick}>
            <StyledArrowBackIosNewIcon />
          </StyledArrowBackIosNewIconButton>
          <StyledHeader>{location}</StyledHeader>
          {isLoggedIn ? (
            <IconWrapper>
              <StyledNotificationIconButton type="button" onClick={handleNotificationModalClick}>
                <StyledNotificationsIcon />
                <StyledBadge />
              </StyledNotificationIconButton>
              <StyledMenuIconButton type="button" onClick={handleSidebarModalClick}>
                <StyledMenuIcon />
              </StyledMenuIconButton>
            </IconWrapper>
          ) : (
            <Link to="/login">
              <StyledAccountCircleIcon />
            </Link>
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
  max-width: 76.8rem;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;

  @media screen and (min-width: 76.8rem) {
    width: 76.8rem;
    margin: 0 auto;
  }
`;

const TopWrapper = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2.4rem;
  height: 100%;
`;

const StyledHeader = styled.h1`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.brand};
  margin: 0.2rem 0 0 0;
  cursor: pointer;
`;

const StyledAccountCircleIcon = styled(AccountCircleIcon)`
  font-size: 3.2rem;
  color: ${({ theme }) => theme.colors.normalGray};
`;

const StyledMenuIconButton = styled.button`
  margin: 0 0 0 1rem;
  padding: 0;
  cursor: pointer;
`;

const StyledMenuIcon = styled(MenuIcon)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.8rem;
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

const StyledArrowBackIosNewIconButton = styled.button`
  padding: 0;
`;

const StyledArrowBackIosNewIcon = styled(ArrowBackIosNewIcon)`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.brand};
  cursor: pointer;
`;

ShortHeader.propTypes = {
  location: PropTypes.string
};

export default ShortHeader;
