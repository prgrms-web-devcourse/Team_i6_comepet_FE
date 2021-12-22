import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import useSWRInfinite from 'swr/infinite';
import { Link } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Avatar } from '@/components/Avatar';
import { BackgroundBox } from '@/components/BackgroundBox';
import { Seperator } from '@/components/Seperator';
import { GET, DELETE, PATCH } from '@/apis/axios';
import { STATUS } from '@/utils/constants';
import { AUTH_ERROR } from '@/utils/constants';

const NotificationModal = ({ isVisible, left, right, bottom, top }) => {
  const [isRequesting, setIsRequesting] = useState(false);
  const { data, size, setSize, mutate } = useSWRInfinite(
    (index) => `/notices?page=${index}&size=4`,
    GET
  );

  const isReachingEnd = data && data[data?.length - 1]?.last;
  const notificationList = data?.reduce((prevData, nextData) => {
    return { notifications: [...prevData.notifications, ...nextData.notifications] };
  })?.notifications;
  const notificationLength = notificationList?.length;

  const handleDeleteAllClick = async () => {
    if (isRequesting) {
      alert(AUTH_ERROR.REQUESTING);
      return;
    }

    try {
      setIsRequesting(true);
      await DELETE('/notices');
      mutate();
    } catch (error) {
      alert(AUTH_ERROR.TRY_AGAIN);
    }

    setIsRequesting(false);
  };

  const handleItemClick = async (id) => {
    try {
      await PATCH(`/notices/${id}`, {
        checked: true
      });
    } catch (error) {
      alert(AUTH_ERROR.TRY_AGAIN);
    }
  };

  const handleDeleteClick = async ({ target }) => {
    if (isRequesting) {
      alert(AUTH_ERROR.REQUESTING);
      return;
    }

    const { id: noticeId } = target.closest('button');

    try {
      setIsRequesting(true);
      await DELETE(`/notices/${noticeId}`);
      mutate();
    } catch (error) {
      alert(AUTH_ERROR.TRY_AGAIN);
    }

    setIsRequesting(false);
  };

  const handleMoreClick = () => {
    !isReachingEnd && setSize(size + 1);
  };

  // TODO: useBlockScroll 사용하면 에러
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'visible';
    };
  });

  return (
    <Wrapper isVisible={isVisible} top={top} left={left} right={right} bottom={bottom}>
      <BackgroundBox width="33rem">
        <TopWrapper>
          <DeleteAllButton onClick={handleDeleteAllClick}>모든 알림 지우기</DeleteAllButton>
        </TopWrapper>
        <Seperator type="horizon" />
        <MiddleWrapper notificationLength={notificationLength}>
          <NotificationList>
            {(notificationLength &&
              notificationList?.map(
                ({ id, animalKindName, image, nickname, postId, status, town, checked }) => (
                  <NotificationItemWrapper key={postId}>
                    <Link to={`post/${postId}`} id={id}>
                      <Seperator type="horizon" />
                      <NotificationItem checked={checked} onClick={handleItemClick(id)}>
                        <Avatar src={image} margin="0 0 0 1.5rem"></Avatar>
                        <TextWrapper>
                          <ColoredText>{town}</ColoredText>에서
                          <ColoredText> {nickname}</ColoredText>님이
                          <br />
                          <ColoredText> {animalKindName}</ColoredText>에 대한
                          <ColoredText status={status}> {STATUS[status]}</ColoredText>글을
                          <br />
                          작성했습니다.
                        </TextWrapper>
                      </NotificationItem>
                    </Link>
                    <DeleteButton id={id} onClick={handleDeleteClick}>
                      <StyledCloseRoundedIcon />
                    </DeleteButton>
                  </NotificationItemWrapper>
                )
              )) || <EmptyItemText>알림이 없습니다.</EmptyItemText>}
          </NotificationList>
        </MiddleWrapper>
        <BottomWrapper>
          {isReachingEnd || (
            <MoreButton onClick={handleMoreClick} disabled={isReachingEnd}>
              <StyledArrowDropDownIcon />
            </MoreButton>
          )}
        </BottomWrapper>
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

const TopWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.8rem;
  padding-top: 0.2rem;
`;

const DeleteAllButton = styled.button`
  padding: 0;
  font-weight: bold;
  letter-spacing: 0.1rem;

  &:hover {
    color: ${({ theme }) => theme.colors.normalRed};
  }
`;

const MiddleWrapper = styled.div`
  overflow: scroll;
  -ms-overflow-style: none;
  height: ${({ notificationLength }) => (notificationLength && '100%') || '9.6rem'};
  max-height: 80vh;
  position: relative;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const NotificationList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const NotificationItemWrapper = styled.div`
  position: relative;
`;

const NotificationItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 10rem;
  background-color: ${({ theme, checked }) =>
    (checked && theme.colors.normalWhite) || theme.colors.lighterBlue};
  cursor: pointer;
`;

const TextWrapper = styled.p`
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

const ColoredText = styled.span`
  color: ${({ theme, status }) => (status && theme.colors[status]) || theme.colors.normalGreen};
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: ${({ theme }) => theme.colors.normalGray};

  &:hover {
    color: ${({ theme }) => theme.colors.normalRed};
  }
`;

const StyledCloseRoundedIcon = styled(CloseRoundedIcon)`
  font-size: 2rem;
`;

const EmptyItemText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.6rem;
`;

const BottomWrapper = styled.div`
  text-align: center;
  background-color: ${({ theme }) => theme.colors.normalWhite};
`;

const MoreButton = styled.button`
  height: 100%;
  padding: 0;
  letter-spacing: 0.1rem;
  border-radius: 0 0 1rem 1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.normalBlack};
`;

const StyledArrowDropDownIcon = styled(ArrowDropDownIcon)`
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
