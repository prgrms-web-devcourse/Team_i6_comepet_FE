import { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import { Avatar } from '@/components/Avatar';
import { Seperator } from '@/components/Seperator';

const SidebarButton = ({ src, nickname }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('');

  const handleClick =
    (newPlacement) =>
    ({ currentTarget }) => {
      setAnchorEl(currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };

  return (
    <Wrapper>
      <MenuButton onClick={handleClick('bottom-end')}>
        <MenuIcon />
      </MenuButton>
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <UserAccount>
                <Avatar src={src} />
                <Nickname>{nickname} 님</Nickname>
              </UserAccount>
              <Seperator type="horizon" />
              <MenuList aria-labelledby="sidebarButton">
                <MenuItem>
                  <a>메인으로 가기</a>
                </MenuItem>
                <MenuItem>
                  <a>개인 정보 수정</a>
                </MenuItem>
                <MenuItem>
                  <a>관심 지역 설정</a>
                </MenuItem>
                <MenuItem>
                  <a>내가 쓴 글</a>
                </MenuItem>
                <MenuItem>
                  <a>내가 저장한 글</a>
                </MenuItem>
                <MenuItem>
                  <a>글 작성</a>
                </MenuItem>
              </MenuList>
              <Seperator type="horizon" />
              <LogoutWrapper>
                <LogoutIconCostomized />
                로그아웃
              </LogoutWrapper>
            </Paper>
          </Fade>
        )}
      </Popper>
    </Wrapper>
  );
};

SidebarButton.propTypes = {
  src: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired
};

const Wrapper = styled.span`
  flex: 1 1 auto;
`;
const MenuButton = styled.button`
  width: 100%;
  font-size: 1.5rem;
`;
const Paper = styled.div`
  width: 30rem;
  height: 40rem;
  background-color: ${({ theme }) => theme.colors.normalWhite};
  border-radius: 1rem;
`;
const UserAccount = styled.div`
  display: flex;
  height: 12rem;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.normalBlack};
`;
const Nickname = styled.span`
  display: inline-block;
  font-size: 1.6rem;
  font-weight: bold;
  line-height: 4rem;
  color: ${({ theme }) => theme.colors.normalBlack};
`;
const MenuList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;
const MenuItem = styled.li`
  & > a {
    display: block;
    text-align: center;
    font-size: 1.6rem;
    line-height: 3.8rem;
    color: ${({ theme }) => theme.colors.normalBlack};

    &:hover {
      background-color: ${({ theme }) => theme.colors.lighterGray};
    }
  }
`;
const LogoutWrapper = styled.a`
  display: inline-block;
  margin: 0.2rem 0 0 1.6rem;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.normalBlack};
`;
const LogoutIconCostomized = styled(LogoutIcon)`
  color: ${({ theme }) => theme.colors.brand};
`;

export default SidebarButton;
