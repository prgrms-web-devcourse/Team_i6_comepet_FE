/* eslint-disable no-unused-vars */

import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Button } from '@/components/Button';
import { Avatar } from '@/components/Avatar';
import { BackgroundBox } from '@/components/BackgroundBox';
import { Seperator } from '@/components/Seperator';
import useSWRInfinite from 'swr/infinite';
import { GET } from '@/apis/axios';
import { STATUS, DEV_ERROR } from '@/utils/constants';
import useBlockScroll from '@/hooks/useBlockScroll';

const NotificationModal = ({ isVisible, left, right, bottom, top }) => {
  const scrollRef = useRef(null);
  const { data, error, size, setSize } = useSWRInfinite(
    (index) => `/notices?page=${index + 1}&size=4`,
    GET
  );

  useBlockScroll(document.body);

  error && alert(DEV_ERROR.LOAD_FAILED);

  const notificationList = data?.reduce((prevData, nextData) => {
    return { notifications: [...prevData.notifications, ...nextData.notifications] };
  })?.notifications;

  const handleMoreButtonClick = () => {
    setSize(size + 1);
  };

  useEffect(() => {
    console.log('scroll');

    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <Wrapper isVisible={isVisible} top={top} left={left} right={right} bottom={bottom}>
      <BackgroundBox width="34rem">
        <TopContainer>
          <StyledButton>
            <TextWrapper>전체삭제</TextWrapper>
          </StyledButton>
        </TopContainer>
        <MiddleContainer ref={scrollRef}>
          <NotificationList aria-labelledby="notificationButton">
            {notificationList?.map(({ nickname, image, postId, status, checked }, index) => {
              return (
                <div key={index}>
                  <Seperator type="horizon" />
                  <NotificationItem key={postId} checked={checked}>
                    <Avatar src={image} margin="0 0 0 2rem"></Avatar>
                    <TextContainer>
                      <BoldText>{nickname} </BoldText>님이
                      <br />
                      <BoldText>{STATUS[status]} </BoldText>
                      글을 작성하셨어요!
                    </TextContainer>
                    <StyledCloseRoundedIcon />
                  </NotificationItem>
                  <Seperator type="horizon" />
                </div>
              );
            })}
          </NotificationList>
        </MiddleContainer>
        <BottomContainer>
          <Button
            height="100%"
            bgColor="lighterGray"
            borderRadius="0 0 1rem 1rem"
            color="normalBlack"
            onClick={handleMoreButtonClick}>
            <ArrowDropDownIconCostomized />
          </Button>
        </BottomContainer>
      </BackgroundBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  bottom: ${({ bottom }) => bottom};
  right: ${({ right }) => right};
  z-index: 1001;
  height: 100%;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 2.8rem;
`;

const StyledButton = styled.button``;

const MiddleContainer = styled.div`
  overflow: scroll;
  height: 40rem;
`;

const TextWrapper = styled.span`
  display: inline-block;
  margin: 0 0 0 2.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  font-size: 1.6rem;

  &:hover {
    color: ${({ theme }) => theme.colors.normalRed};
  }
`;

const BoldText = styled.span`
color: ${({ theme }) => theme.colors.normalGreen};
font-size: "1.6rem"
font-weight: "bold"
`;

const BottomContainer = styled.div`
  width: 100%;
  height: 10%;
`;

const NotificationList = styled.ul`
  display: flex;

  flex-direction: column;
`;

const NotificationItem = styled.li`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 10rem;
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

NotificationModal.propTypes = {
  isVisible: PropTypes.bool,
  top: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string,
  bottom: PropTypes.string
};

export default NotificationModal;
