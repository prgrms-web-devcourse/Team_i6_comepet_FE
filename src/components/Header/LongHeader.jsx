import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BackgroundBox } from '@/components/BackgroundBox';
import { Button } from '@/components/Button';
import { Image } from '@/components/Image';
import { getImageSrc } from '@/utils/helpers';
import { InformationModal, NotificationModal, SidebarModal, SearchModal } from './PopupModal';
import MenuIcon from '@mui/icons-material/Menu';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useAuth from '@/hooks/useAuth';

const LongHeader = ({ onSearch, usedAt }) => {
  const { isLoggedIn } = useAuth();
  const [isSidebarModalVisible, setIsSidebarModalVisible] = useState(false);
  const [isInformationModalVisible, setIsInformationModalVisible] = useState(false);
  const [isNotificationModalVisible, setIsNotificationModalVisible] = useState(false);
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);

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
      <BackgroundBox borderRadius="0 0 1.6rem 1.6rem" height="17rem">
        <TopWrapper>
          <StyledMenuIconButton type="button" onClick={handleSidebarModalClick}>
            <StyledMenuIcon />
          </StyledMenuIconButton>
          <StyledHeader onClick={scrollToTop}>ComePet</StyledHeader>
          {isLoggedIn ? (
            <IconWrapper>
              <StyledErrorOutlineIconButton type="button" onClick={handleInformationModalClick}>
                <StyledErrorOutlineIcon />
              </StyledErrorOutlineIconButton>
              <StyledNotificationIconButton type="button" onClick={handleNotificationModalClick}>
                <StyledNotificationsIcon />
                <StyledBadge />
              </StyledNotificationIconButton>
            </IconWrapper>
          ) : (
            <StyledLink to="/login">
              <StyledAccountCircleIcon />
            </StyledLink>
          )}
        </TopWrapper>
        <MiddleWrapper>
          <BackgroundBox width="45%" boxShadow="0px 4px 16px rgba(0, 0, 0, 0.08)">
            <Link to="/">
              <Button bgColor="normalWhite" color="brand" fontWeight="bold" borderRadius="1.6rem">
                <Image
                  src={getImageSrc('/images/finding.png')}
                  width="1.6rem"
                  height="1.6rem"
                  margin="0 0.5rem 0 0"
                />
                실종 및 보호
              </Button>
            </Link>
          </BackgroundBox>
          <BackgroundBox width="45%" boxShadow="0px 4px 16px rgba(0, 0, 0, 0.08)">
            <Link to="/shelter">
              <Button bgColor="normalWhite" color="brand" fontWeight="bold" borderRadius="1.6rem">
                <Image
                  src={getImageSrc('/images/home.png')}
                  width="1.6rem"
                  height="1.6rem"
                  margin="0 0.5rem 0 0"
                />
                보호소 동물
              </Button>
            </Link>
          </BackgroundBox>
        </MiddleWrapper>
        <BottomWrapper>
          <SearchButton type="button" onClick={handleSearchModalClick}>
            세부 검색을 위해 클릭해주세요
          </SearchButton>
          <StyledSearchIconButton type="button">
            <StyledSearchRoundedIcon />
          </StyledSearchIconButton>
        </BottomWrapper>
      </BackgroundBox>
      <InformationModal isVisible={isInformationModalVisible} top="5rem" right="3%" />
      <NotificationModal isVisible={isNotificationModalVisible} top="5rem" right="3%" />
      <SidebarModal isVisible={isSidebarModalVisible} top="5rem" left="2rem" />
      <SearchModal
        isVisible={isSearchModalVisible}
        left="50%"
        top="120%"
        translate="translate(-50%, 0%)"
        onSearch={(filterConditions) => {
          onSearch(filterConditions);
        }}
        onCloseModal={handleSearchModalClick}
        usedAt={usedAt}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  max-width: 61.2rem;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  z-index: 1000;
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
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.4rem;
  color: ${({ theme }) => theme.colors.brand};
  margin: 0.2rem 0 0 0;
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

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledAccountCircleIcon = styled(AccountCircleIcon)`
  font-size: 3.2rem;
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

const StyledSearchIconButton = styled.button`
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

const StyledSearchRoundedIcon = styled(SearchRoundedIcon)`
  font-size: 2.4rem;
  color: ${({ theme }) => theme.colors.normalWhite};
`;

LongHeader.propTypes = {
  onSearch: PropTypes.func,
  usedAt: PropTypes.string
};

export default LongHeader;
