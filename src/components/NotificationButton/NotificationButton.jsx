import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import { Button } from '@/components/Button';
import { Avatar } from '@/components/Avatar';

const NotificationButton = ({ notices }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    <Wrapper>
      <NotiButton onClick={handleClick('bottom-end')} aria-label="notificationButton">
        <NotificationsIconCustomized />
        <StyledBadge />
      </NotiButton>
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <TopContainer>
                <Button width="5rem" height="100%" color="normalBlack" fontSize="1rem">
                  전체삭제
                </Button>
              </TopContainer>
              <MiddleContainer>
                <NotiList aria-labelledby="notificationButton">
                  <NotiItem>
                    <Avatar size="5.3rem" />
                    <a>{notices}</a>
                    <Button width="2rem" height="2rem" color="normalGray" margin="0 1% 20% 0">
                      <CloseIcon />
                    </Button>
                  </NotiItem>
                </NotiList>
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
            </Paper>
          </Fade>
        )}
      </Popper>
    </Wrapper>
  );
};
NotificationButton.propTypes = {
  notices: PropTypes.array
};
const Wrapper = styled.span`
  flex: 1 1 auto;
`;
const NotiButton = styled.button`
  position: relative;
`;
const NotificationsIconCustomized = styled(NotificationsIcon)`
  font-size: 1.5rem;
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
const Paper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-end;
  width: 30rem;
  height: 40rem;
  background-color: ${({ theme }) => theme.colors.nomalWhite};
  border-radius: 1rem;
`;
const TopContainer = styled.div`
  width: 100%;
  height: 5%;
  text-align: left;
`;
const MiddleContainer = styled.div`
  width: 100%;
  height: 85%;
  justify-content: flex-end;
`;
const BottomContainer = styled.div`
  width: 100%;
  height: 10%;
`;
const NotiList = styled.ul`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
`;
const NotiItem = styled.li`
  display: flex;
  height: 10rem;
  align-items: center;

  & > a {
    display: inline-block;
    margin-right: 4rem;
    width: 15rem;
    text-align: left;
    font-size: 1.6rem;
    word-break: break-all;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.lighterGray};
  }
`;
const ArrowDropDownIconCostomized = styled(ArrowDropDownIcon)`
  font-size: 3rem;
`;
export default NotificationButton;
