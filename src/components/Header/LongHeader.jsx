import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { BackgroundBox } from '@/components/BackgroundBox';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Image } from '@/components/Image';
import { getImageSrc } from '@/utils/helpers';
import InformationModal from './Modal/InformationModal/InformationModal';
import NotificationModal from './Modal/NotificationModal/NotificationModal';
import SidebarModal from './Modal/SidebarModal/SidebarModal';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const LongHeader = ({ isLoggedIn = true }) => {
  const [isSidebarModalVisible, setIsSidebarModalVisible] = useState(false);
  const [isInformationModalVisible, setIsInformationModalVisible] = useState(false);
  const [isNotificationModalVisible, setIsNotificationModalVisible] = useState(false);

  const closeAllModalsExceptFor = (targetModal) => {
    if (isSidebarModalVisible && !targetModal) {
      setIsSidebarModalVisible(!isSidebarModalVisible);
      return;
    }

    if (isInformationModalVisible && !targetModal) {
      setIsInformationModalVisible(!isInformationModalVisible);
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

  const handleInformationModalClick = () => {
    closeAllModalsExceptFor(isInformationModalVisible);
    setIsInformationModalVisible(!isInformationModalVisible);
  };

  const handleNotificationModalClick = () => {
    closeAllModalsExceptFor(isNotificationModalVisible);
    setIsNotificationModalVisible(!isNotificationModalVisible);
  };

  return (
    <Wrapper>
      <BackgroundBox borderRadius="0 0 1.6rem 1.6rem" height="17rem">
        <TopWrapper>
          <StyledMenuIconButton onClick={handleSidebarModalClick}>
            <StyledMenuIcon />
          </StyledMenuIconButton>
          <StyledHeader>Comepet</StyledHeader>
          {isLoggedIn ? (
            <IconWrapper>
              <StyledErrorOutlineIconButton onClick={handleInformationModalClick}>
                <StyledErrorOutlineIcon />
              </StyledErrorOutlineIconButton>
              <StyledNotificationIconButton onClick={handleNotificationModalClick}>
                <StyledNotificationsIcon />
                <StyledBadge />
              </StyledNotificationIconButton>
            </IconWrapper>
          ) : (
            <Button type="button" width="2.6rem" height="2.6rem">
              <StyledAccountCircleIcon />
            </Button>
          )}
        </TopWrapper>
        <MiddleWrapper>
          <BackgroundBox width="45%" boxShadow="0px 4px 16px rgba(0, 0, 0, 0.08)">
            <Button
              bgColor="normalWhite"
              type="button"
              color="brand"
              fontWeight="bold"
              borderRadius="1.6rem">
              <Image
                src={getImageSrc('/images/finding.png')}
                width="1.6rem"
                height="1.6rem"
                margin="0 0.5rem 0 0"
              />
              실종 및 보호
            </Button>
          </BackgroundBox>
          <BackgroundBox width="45%" boxShadow="0px 4px 16px rgba(0, 0, 0, 0.08)">
            <Button
              bgColor="normalWhite"
              type="button"
              color="brand"
              fontWeight="bold"
              borderRadius="1.6rem">
              <Image
                src={getImageSrc('/images/home.png')}
                width="1.6rem"
                height="1.6rem"
                margin="0 0.5rem 0 0"
              />
              보호소 동물
            </Button>
          </BackgroundBox>
        </MiddleWrapper>
        <BottomWrapper>
          <Input placeholder="세부 검색을 위해 클릭해주세요" borderRadius="1.6rem" />
          <StyledSearchIconButton>
            <StyledSearchIcon />
          </StyledSearchIconButton>
        </BottomWrapper>
      </BackgroundBox>
      <InformationModal isVisible={isInformationModalVisible} top="5rem" right="3rem" />
      <NotificationModal isVisible={isNotificationModalVisible} top="5rem" right="3rem" />
      <SidebarModal isVisible={isSidebarModalVisible} top="5rem" left="2rem" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
`;

const TopWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2.4rem;
`;

const StyledMenuIconButton = styled.button`
  padding: 0;
  font-size: 1.5rem;
  cursor: pointer;
`;

const StyledMenuIcon = styled(MenuIcon)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.8rem;
  color: ${({ theme }) => theme.colors.brand};
`;

const StyledHeader = styled.h1`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.brand};
  cursor: pointer;
`;

const IconWrapper = styled.div`
  display: flex;
`;

const StyledErrorOutlineIconButton = styled.button`
  padding: 0;
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

const StyledErrorOutlineIcon = styled(ErrorOutlineIcon)`
  font-size: 2.8rem;
  margin-right: 0.8rem;
  color: ${({ theme }) => theme.colors.brand};
`;

const StyledAccountCircleIcon = styled(AccountCircleIcon)`
  font-size: 2.6rem;
  color: ${({ theme }) => theme.colors.normalGray};
`;

const MiddleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.8rem;
  padding: 0 2.4rem;
`;

const BottomWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin: 1.6rem 2.4rem 0 2.4rem;
`;

const StyledSearchIconButton = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  right: 2%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 50%;
  width: 3.2rem;
  height: 3.2rem;
  background-color: ${({ theme }) => theme.colors.brand};
`;

const StyledSearchIcon = styled(SearchIcon)`
  font-size: 2.4rem;
  color: ${({ theme }) => theme.colors.normalWhite};
`;

LongHeader.propTypes = {
  isLoggedIn: PropTypes.bool
};

export default LongHeader;
