import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import { Avatar } from '@/components/Avatar';
import { Seperator } from '@/components/Seperator';
import { BackgroundBox } from '@/components/BackgroundBox';
import { Text } from '@/components/Text';

const MenuButton = ({ src, nickname }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();

  const handleClick =
    (newPlacement) =>
    ({ currentTarget }) => {
      setAnchorEl(currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };

  return (
    <Wrapper>
      <StyledMenuIconButton onClick={handleClick('bottom-end')}>
        <StyledMenuIcon />
      </StyledMenuIconButton>
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <BackgroundBox width="30rem">
                <TopContainer>
                  <Avatar src={src} />
                  <Nickname>
                    <Text color="normalOrange">{nickname} 둘리가 귀여워</Text>님 어서오세요!
                  </Nickname>
                </TopContainer>
                <Seperator type="horizon" />
                <MiddleContainer aria-labelledby="sidebarButton">
                  <MenuItem>메인으로 가기</MenuItem>
                  <MenuItem>개인 정보 수정</MenuItem>
                  <MenuItem>관심 지역 설정</MenuItem>
                  <MenuItem>내가 쓴 글</MenuItem>
                  <MenuItem>내가 저장한 글</MenuItem>
                  <MenuItem>글 작성</MenuItem>
                </MiddleContainer>
                <Seperator type="horizon" />
                <BottomContainer>
                  <LogoutWrapper>
                    <StyledLogoutIcon />
                    로그아웃
                  </LogoutWrapper>
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

const StyledMenuIconButton = styled.button`
  width: 100%;
  padding: 0;
  font-size: 1.5rem;
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

// const Text = styled.span`
//   font-weight: bolder;
//   color: ${({ theme }) => theme.colors.normalOrange};
// `;

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

const StyledMenuIcon = styled(MenuIcon)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.8rem;
  margin-left: 1rem;
  color: ${({ theme }) => theme.colors.brand};
`;

MenuButton.propTypes = {
  src: PropTypes.string,
  nickname: PropTypes.string
};

export default MenuButton;
