import React from 'react';
import styled from '@emotion/styled';
import MenuIcon from '@mui/icons-material/Menu';
import { BackgroundBox } from '@/components/BackgroundBox';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Image } from '@/components/Image';
import SearchIcon from '@mui/icons-material/Search';

const LongHeader = () => {
  return (
    <Wrapper>
      <BackgroundBox borderRadius="0 0 1.6rem 1.6rem" height="18rem">
        <TopContainer>
          <StyledMenu />
          <h1>Compet</h1>
          <Button
            bgColor="#fff"
            type="button"
            width="2.8rem"
            height="2.8rem"
            borderRadius="50%"
            margin="0 1rem 0 0">
            <Image alt="로그인" width="2.8rem" height="2.8rem" type="profile" />
          </Button>
        </TopContainer>
        <MiddleContainer>
          <BackgroundBox width="15rem">
            <Button bgColor="#fff" type="button" color="#2A2E56">
              실종 및 보호
            </Button>
          </BackgroundBox>
          <BackgroundBox width="15rem">
            <Button bgColor="#fff" type="button" color="#2A2E56">
              보호소 동물
            </Button>
          </BackgroundBox>
        </MiddleContainer>
        <BottomContainer>
          <Input placeholder="게시글 찾아보기" />
          <StyledSearch />
        </BottomContainer>
      </BackgroundBox>
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
const MiddleContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 1.2rem;
`;
const BottomContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1.6rem 2.8rem 0 2.8rem;
`;

const StyledMenu = styled(MenuIcon)`
  font-size: 3rem;
  margin-left: 1rem;
`;

const StyledSearch = styled(SearchIcon)`
  position: absolute;
  right: 0;
  margin: 0.4rem 3.6rem 0 0;
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.brand};
`;

export default LongHeader;
