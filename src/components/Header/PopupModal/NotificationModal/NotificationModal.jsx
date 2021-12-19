import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Button } from '@/components/Button';
import { Avatar } from '@/components/Avatar';
import { BackgroundBox } from '@/components/BackgroundBox';
import { Seperator } from '@/components/Seperator';

const dummyData = [
  {
    nickname: '고양이가 멍멍',
    image: 'https://source.unsplash.com/random',
    postId: 100,
    status: '목격',
    checked: true
  },
  {
    nickname: '성격 드러운 고먐미',
    image: 'https://source.unsplash.com/daily',
    postId: 101,
    status: '완료',
    checked: false
  },
  {
    nickname: '어벤져스에서아이언멘은',
    image: 'https://source.unsplash.com/weekly',
    postId: 102,
    status: '발견',
    checked: false
  },
  {
    nickname: '블랑킷을입은양탄자를',
    image: 'https://source.unsplash.com/category/nature',
    postId: 103,
    status: '실종',
    checked: true
  }
];

const NotificationModal = ({ isVisible, left, right, bottom, top }) => {
  return (
    <Wrapper isVisible={isVisible} top={top} left={left} right={right} bottom={bottom}>
      <BackgroundBox width="34rem">
        <TopContainer>
          <StyledButton>
            <TextWrapper>전체삭제</TextWrapper>
          </StyledButton>
        </TopContainer>
        <MiddleContainer>
          <NotificationList aria-labelledby="notificationButton">
            {dummyData.map(({ nickname, image, postId, status, checked }, index) => {
              return (
                <div key={index}>
                  <Seperator type="horizon" key={index} />
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
            type="button">
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
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 2.8rem;
`;

const StyledButton = styled.button``;

const Text = styled.span`
  display: inline-block;
  margin: ${({ margin }) => margin};
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  color: ${({ theme, color }) => theme.colors[color] || color};
  cursor: ${({ cursor }) => cursor};
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

const MiddleContainer = styled.div``;

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
