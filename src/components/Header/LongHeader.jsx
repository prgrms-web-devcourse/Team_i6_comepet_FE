import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {
  InformationModal as _InformationModal,
  NotificationModal as _NotificationModal,
  SidebarModal as _SidebarModal,
  SearchModal
} from './PopupModal';
import { Link as _Link } from 'react-router-dom';
import { BackgroundBox as _BackgroundBox } from '@/components/BackgroundBox';
import { Image as _Image } from '@/components/Image';
import _MenuIcon from '@mui/icons-material/Menu';
import _SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import _NotificationsIcon from '@mui/icons-material/Notifications';
import _ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import _AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useAuth from '@/hooks/useAuth';
import useAlarm from '@/hooks/useAlarm';
import { getImageSrc } from '@/utils/helpers';

const LongHeader = ({ onSearch, usedAt }) => {
  const { isLoggedIn } = useAuth();
  const [isSidebarModalVisible, setIsSidebarModalVisible] = useState(false);
  const [isInformationModalVisible, setIsInformationModalVisible] = useState(false);
  const [isNotificationModalVisible, setIsNotificationModalVisible] = useState(false);
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const { isUnreadNotification } = useAlarm();

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

    if (isSearchModalVisible && !targetModal) {
      setIsSearchModalVisible(!isSearchModalVisible);
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

  const handleSearchModalClick = () => {
    closeAllModalsExceptFor(isSearchModalVisible);
    setIsSearchModalVisible(!isSearchModalVisible);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Wrapper>
      <BackgroundBox>
        <TopWrapper>
          <SidebarButton type="button" onClick={handleSidebarModalClick}>
            <MenuIcon />
          </SidebarButton>
          <Title onClick={scrollToTop}>ComePet</Title>
          {(isLoggedIn && (
            <ButtonWrapper>
              <InformationButton type="button" onClick={handleInformationModalClick}>
                <ErrorOutlineIcon />
              </InformationButton>
              <NotificationButton type="button" onClick={handleNotificationModalClick}>
                <NotificationsIcon />
                {isUnreadNotification && <Badge />}
              </NotificationButton>
            </ButtonWrapper>
          )) || (
            <Link to="/login">
              <AccountCircleIcon />
            </Link>
          )}
        </TopWrapper>
        <MiddleWrapper>
          <FilterMenuBackground>
            <FilterMenu to="/">
              <Image src={getImageSrc('/images/finding.png')} />
              실종 및 보호
            </FilterMenu>
          </FilterMenuBackground>
          <FilterMenuBackground>
            <FilterMenu to="/shelter">
              <Image src={getImageSrc('/images/home.png')} />
              보호소 동물
            </FilterMenu>
          </FilterMenuBackground>
        </MiddleWrapper>
        <BottomWrapper>
          <SearchButton type="button" onClick={handleSearchModalClick}>
            세부 검색을 위해 클릭해주세요
          </SearchButton>
          <SearchIconButton type="button">
            <SearchRoundedIcon />
          </SearchIconButton>
        </BottomWrapper>
      </BackgroundBox>
      <InformationModal isVisible={isInformationModalVisible} />
      <NotificationModal isVisible={isNotificationModalVisible} />
      <SidebarModal isVisible={isSidebarModalVisible} />
      {isSearchModalVisible && (
        <SearchModal
          isVisible={isSearchModalVisible}
          onSearch={onSearch}
          onCloseModal={handleSearchModalClick}
          usedAt={usedAt}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: 100%;
  max-width: 76.8rem;
`;

const BackgroundBox = styled(_BackgroundBox)`
  height: 17rem;
`;

const TopWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2.4rem;
`;

const SidebarButton = styled.button`
  font-size: 1.5rem;
  cursor: pointer;
`;

const MenuIcon = styled(_MenuIcon)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.8rem;
  color: ${({ theme }) => theme.colors.brand};
`;

const Title = styled.h1`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.4rem;
  margin: 0.2rem 0 0 0;
  color: ${({ theme }) => theme.colors.brand};
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const Link = styled(_Link)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AccountCircleIcon = styled(_AccountCircleIcon)`
  font-size: 3.2rem;
  color: ${({ theme }) => theme.colors.normalGray};
`;

const InformationButton = styled.button``;

const ErrorOutlineIcon = styled(_ErrorOutlineIcon)`
  font-size: 2.8rem;
  margin-right: 0.8rem;
  color: ${({ theme }) => theme.colors.brand};
`;

const NotificationButton = styled.button`
  position: relative;
`;

const NotificationsIcon = styled(_NotificationsIcon)`
  font-size: 2.8rem;
  color: ${({ theme }) => theme.colors.brand};
`;

const Badge = styled.div`
  position: absolute;
  right: 0.3rem;
  top: 0.3rem;
  width: 0.5rem;
  height: 0.5rem;
  background-color: red;
  border-radius: 50%;
`;

const MiddleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.8rem;
  padding: 0 2.4rem;
`;

const FilterMenuBackground = styled(_BackgroundBox)`
  width: 45%;
  height: 4rem;
  box-shadow: 0 0.4rem 1.6rem rgba(0, 0, 0, 0.08);
  cursor: pointer;
  :hover {
    background-color: ${({ theme }) => theme.colors.lighterBlue};
  }
`;

const FilterMenu = styled(_Link)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 1.6rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.brand};
`;

const Image = styled(_Image)`
  width: 1.6rem;
  height: 1.6rem;
  margin: 0 0.5rem 0 0;
`;

const BottomWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin: 1.6rem 2.4rem 0 2.4rem;
`;

const SearchButton = styled.button`
  box-shadow: ${({ theme }) => theme.shadows.light};
  width: 100%;
  padding: 0 0 0 2rem;
  height: 4rem;
  border-radius: 1.6rem;
  text-align: left;
  color: ${({ theme }) => theme.colors.normalGray};
  z-index: 1;
  cursor: pointer;
`;

const SearchIconButton = styled.button`
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 50%;
  width: 3.2rem;
  height: 3.2rem;
  background-color: ${({ theme }) => theme.colors.brand};
`;

const SearchRoundedIcon = styled(_SearchRoundedIcon)`
  font-size: 2.4rem;
  color: ${({ theme }) => theme.colors.normalWhite};
`;

const InformationModal = styled(_InformationModal)`
  top: 5rem;
  right: 3%;
`;

const NotificationModal = styled(_NotificationModal)`
  top: 5rem;
  right: 3%;
`;

const SidebarModal = styled(_SidebarModal)`
  top: 5rem;
  left: 2rem;
`;

LongHeader.propTypes = {
  onSearch: PropTypes.func,
  usedAt: PropTypes.string
};

export default LongHeader;
