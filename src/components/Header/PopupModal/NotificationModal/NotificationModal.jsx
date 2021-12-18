import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import useSWRInfinite from 'swr/infinite';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Button } from '@/components/Button';
import { Avatar } from '@/components/Avatar';
import { BackgroundBox } from '@/components/BackgroundBox';
import { Seperator } from '@/components/Seperator';
import { GET } from '@/apis/axios';
import { STATUS, DEV_ERROR } from '@/utils/constants';
import useBlockScroll from '@/hooks/useBlockScroll';

const NotificationModal = ({ isVisible, left, right, bottom, top }) => {
  useBlockScroll(document.body);

  const { data, error, size, setSize } = useSWRInfinite(
    (index) => `/notices?page=${index + 1}&size=4`,
    GET
  );

  error && alert(DEV_ERROR.LOAD_FAILED);

  const isReachingEnd = data && data[data?.length - 1]?.last;
  const notificationList = data?.reduce((prevData, nextData) => {
    return { notifications: [...prevData.notifications, ...nextData.notifications] };
  })?.notifications;

  const handleMoreButtonClick = () => {
    !isReachingEnd && setSize(size + 1);
  };

  return (
    <Wrapper isVisible={isVisible} top={top} left={left} right={right} bottom={bottom}>
      <BackgroundBox width="30rem">
        <TopContainer>
          <StyledButton>모든 알림 지우기</StyledButton>
        </TopContainer>
        <Seperator type="horizon" />
        <MiddleContainer>
          <NotificationList aria-labelledby="notificationButton">
            {(notificationList?.length &&
              notificationList?.map(
                ({ animalKindName, image, nickname, postId, status, town, checked }) => {
                  return (
                    <div key={postId}>
                      <Seperator type="horizon" />
                      <Link to={`post/${postId}`}>
                        <NotificationItem key={postId} checked={checked}>
                          <Avatar src={image} margin="0 0 0 1.5rem"></Avatar>
                          <TextContainer>
                            <ColoredText>{town}</ColoredText>에서
                            <ColoredText> {nickname}</ColoredText>님이
                            <br />
                            <ColoredText> {animalKindName}</ColoredText>에 대한
                            <ColoredText status={status}> {STATUS[status]}</ColoredText>글을
                            <br />
                            작성했습니다.
                          </TextContainer>
                          <StyledCloseRoundedIcon id={postId} onClick={handleDeleteButtonClick} />
                        </NotificationItem>
                      </Link>
                      <Seperator type="horizon" />
                    </div>
                  );
                }
              )) || <EmptyItem>알림이 없습니다.</EmptyItem>}
          </NotificationList>
        </MiddleContainer>
        <BottomContainer>
          <Button
            height="100%"
            bgColor="lighterGray"
            borderRadius="0 0 1rem 1rem"
            color="normalBlack"
            onClick={handleMoreButtonClick}
            disabled={isReachingEnd}>
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
  justify-content: center;
  align-items: center;
  height: 2.8rem;
  padding-top: 0.2rem;
`;

const StyledButton = styled.button`
  padding: 0;
  font-weight: bold;
  letter-spacing: 0.1rem;

  &:hover {
    color: ${({ theme }) => theme.colors.normalRed};
  }
`;

const MiddleContainer = styled.div`
  height: 40rem;
  overflow: scroll;
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }
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
    background-color: ${({ theme }) => theme.colors.lighterBlue};
  }
`;

const TextContainer = styled.p`
  width: 80%;
  margin: 0;
  padding: 1.6rem 1.6rem 1.6rem 1.6rem;
  font-size: 1.6rem;
  word-break: keep-all;
  line-height: 2.2rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const StyledCloseRoundedIcon = styled(CloseRoundedIcon)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.normalGray};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.normalRed};
  }
`;

const ColoredText = styled.span`
  color: ${({ theme, status }) => (status && theme.colors[status]) || theme.colors.normalGreen};
`;

const EmptyItem = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.6rem;
`;

const BottomContainer = styled.div``;

const ArrowDropDownIconCostomized = styled(ArrowDropDownIcon)`
  font-size: 2.8rem;
`;

NotificationModal.propTypes = {
  isVisible: PropTypes.bool,
  top: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string,
  bottom: PropTypes.string
};

export default NotificationModal;
