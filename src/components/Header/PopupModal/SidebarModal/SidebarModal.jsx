import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar } from '@/components/Avatar';
import { Seperator } from '@/components/Seperator';
import { BackgroundBox } from '@/components/BackgroundBox';
import { Text } from '@/components/Text';

const SidebarModal = ({ src, nickname = '둘리가 귀여워', isVisible, left, top, right, bottom }) => {
  return (
    <Wrapper isVisible={isVisible} top={top} left={left} right={right} bottom={bottom}>
      <BackgroundBox width="30rem">
        <TopContainer>
          <Avatar src={src} />
          <Nickname>
            <Text color="normalOrange">{nickname}</Text>님 어서오세요!
          </Nickname>
        </TopContainer>
        <Seperator type="horizon" />
        <MiddleContainer>
          <MenuItem>메인으로 가기</MenuItem>
          <MenuItem>개인 정보 수정</MenuItem>
          <MenuItem>관심 지역 설정</MenuItem>
          <MenuItem>내가 쓴 글</MenuItem>
          <MenuItem>내가 저장한 글</MenuItem>
          <Link to="/post/create">
            <MenuItem>글 작성</MenuItem>
          </Link>
        </MiddleContainer>
        <Seperator type="horizon" />
        <BottomContainer>
          <LogoutWrapper>
            <StyledLogoutIcon />
            로그아웃
          </LogoutWrapper>
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
  height: 13rem;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.normalBlack};
`;

const Nickname = styled.span`
  display: inline-block;
  margin-top: 1.6rem;
  font-size: 1.6rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.normalBlack};
`;

const MiddleContainer = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const MenuItem = styled.li`
  display: block;
  text-align: center;
  font-size: 1.6rem;
  line-height: 3.8rem;
  color: ${({ theme }) => theme.colors.normalBlack};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lighterGray};
    font-weight: bold;
  }
`;

const BottomContainer = styled.div`
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lighterGray};
    font-weight: bold;
  }
`;

const LogoutWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 3rem;
  height: 5rem;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.normalBlack};
`;

const StyledLogoutIcon = styled(LogoutIcon)`
  margin: 0 1rem 0 0;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.brand};
`;

SidebarModal.propTypes = {
  src: PropTypes.string,
  nickname: PropTypes.string,
  isVisible: PropTypes.bool,
  place: PropTypes.string,
  top: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string,
  bottom: PropTypes.string
};

export default SidebarModal;
