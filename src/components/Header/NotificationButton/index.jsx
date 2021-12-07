import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import { Button } from '@/components/Button';
import { Avatar } from '@/components/Avatar';
import Paper from '@mui/material/Paper';
import { BackgroundBox } from '@/components/BackgroundBox';
import { Text } from '@/components/Text';
import { Seperator } from '@/components/Seperator';

const dummyData = [
  {
    nickname: '고양이가 멍멍',
    image: 'https://source.unsplash.com/random',
    postId: 1,
    status: '목격',
    checked: true
  },
  {
    nickname: '성격 드러운 고먐미',
    image: 'https://source.unsplash.com/daily',
    postId: 2,
    status: '완료',
    checked: false
  },
  {
    nickname: '어벤져스에서아이언멘은',
    image: 'https://source.unsplash.com/weekly',
    postId: 3,
    status: '발견',
    checked: false
  },
  {
    nickname: '블랑킷을입은양탄자를',
    image: 'https://source.unsplash.com/category/nature',
    postId: 4,
    status: '실종',
    checked: true
  }
];

const NotificationButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    <Wrapper>
      <StyledNotificationsIconButton
        onClick={handleClick('bottom-end')}
        aria-label="notificationButton">
        <NotificationsIconCustomized />
        <StyledBadge />
      </StyledNotificationsIconButton>
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <BackgroundBox>
                <TopContainer>
                  <TextWrapper>전체삭제</TextWrapper>
                </TopContainer>
                <MiddleContainer>
                  <NotificationList aria-labelledby="notificationButton">
                    {dummyData.map(({ nickname, image, postId, status, checked }) => {
                      return (
                        <>
                          <Seperator type="horizon" />
                          <NotificationItem key={postId} checked={checked}>
                            <Avatar src={image} margin="0 0 0 2rem"></Avatar>
                            <TextContainer>
                              <Text color="normalGreen" fontSize="1.6rem" fontWeight="bold">
                                {nickname}
                              </Text>
                              님이
                              <br />
                              <Text color="normalGreen" fontSize="1.6rem" fontWeight="bold">
                                {status}
                              </Text>
                              글을 작성했어요!
                            </TextContainer>
                            <StyledCloseRoundedIcon />
                          </NotificationItem>
                        </>
                      );
                    })}
                  </NotificationList>
                </MiddleContainer>
                <BottomContainer>
                  <Button
                    height="100%"
                    bgColor="lighterGray"
                    borderRadius="0 0 1rem 1rem"
                    color="normalBlack">
                    <ArrowDropDownIconCostomized />
                  </Button>
                </BottomContainer>
              </BackgroundBox>
            </Paper>
          </Fade>
        )}
      </Popper>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const StyledNotificationsIconButton = styled.button`
  position: relative;
`;

const NotificationsIconCustomized = styled(NotificationsIcon)`
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

const TopContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 1.8rem;
`;

const TextWrapper = styled.span`
  display: inline-block;
  margin: 0 0 0 2.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.normalRed};
  }
`;

const MiddleContainer = styled.div`
  width: 100%;
  height: 5%;
  text-align: left;
`;

const BottomContainer = styled.div`
  width: 100%;
  height: 10%;
`;

const NotificationList = styled.ul`
  display: flex;
  height: 100%;
  flex-direction: column;
`;

const NotificationItem = styled.li`
  display: flex;
  align-items: center;
  position: relative;
  width: 32rem;
  height: 8rem;
  background-color: ${({ checked }) => (checked ? '#e1f5fe' : '#fff')};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lighterGray};
  }
`;

const TextContainer = styled.div`
  flex-grow: 1;
  margin-left: 2rem;
  font-size: 1.6rem;
`;

const StyledCloseRoundedIcon = styled(CloseRoundedIcon)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 1.6rem;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.normalRed};
  }
`;

const ArrowDropDownIconCostomized = styled(ArrowDropDownIcon)`
  font-size: 2rem;
`;

NotificationButton.propTypes = {
  notices: PropTypes.array
};

export default NotificationButton;
