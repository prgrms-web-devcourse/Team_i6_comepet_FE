import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { BackgroundBox } from '@/components/BackgroundBox';
import { Button } from '@/components/Button';
import { Image } from '@/components/Image';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Modal from './Modal/';

const ShortHeader = ({ isLoggedIn = true, location = 'Comepet' }) => {
  const [isNotificationModalVisible, setIsNotificationModalVisible] = useState(false);
  const [isSidebarModalVisible, setIsSidebarModalVisible] = useState(false);

  const handleNotificationModalClick = () => {
    isSidebarModalVisible && setIsSidebarModalVisible(!isSidebarModalVisible);
    setIsNotificationModalVisible(!isNotificationModalVisible);
  };

  const handleSidebarModalClick = () => {
    isNotificationModalVisible && setIsNotificationModalVisible(!isNotificationModalVisible);
    setIsSidebarModalVisible(!isSidebarModalVisible);
  };

  return (
    <Wrapper>
      <BackgroundBox borderRadius="0 0 1.6rem 1.6rem" height="5rem">
        <TopContainer>
          <StyledArrowBackIosNewIcon />
          <StyledHeader>{location}</StyledHeader>
          {isLoggedIn ? (
            <IconContainer>
              <StyledNotificationsIconButton onClick={handleNotificationModalClick}>
                <StyledNotificationsIcon />
                <StyledBadge />
              </StyledNotificationsIconButton>
              <StyledMenuIconButton onClick={handleSidebarModalClick}>
                <StyledMenuIcon />
              </StyledMenuIconButton>
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
      <Modal
        isNotificationModalVisible={isNotificationModalVisible}
        isSidebarModalVisible={isSidebarModalVisible}
      />
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

const StyledNotificationsIconButton = styled.button`
  position: relative;
`;

const StyledNotificationsIcon = styled(NotificationsIcon)`
  font-size: 2.5rem;
  flex: 1 1 auto;
  color: ${({ theme }) => theme.colors.brand};
`;

const StyledBadge = styled.sup`
  position: absolute;
  top: 0;
  right: 0;
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background-color: red;
  transform: translate(-110%, 20%);
`;

const StyledArrowBackIosNewIcon = styled(ArrowBackIosNewIcon)`
  font-size: 2rem;
  margin-left: 1rem;
  color: ${({ theme }) => theme.colors.brand};
  cursor: pointer;
`;

const StyledMenuIconButton = styled.button`
  width: 100%;
  padding: 0;
  font-size: 1.5rem;
`;

const StyledMenuIcon = styled(MenuIcon)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.8rem;
  margin-left: 1rem;
  color: ${({ theme }) => theme.colors.brand};
`;

ShortHeader.propTypes = {
  isLoggedIn: PropTypes.bool,
  location: PropTypes.string
};

export default ShortHeader;
