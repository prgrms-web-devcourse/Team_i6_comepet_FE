import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { BackgroundBox } from '@/components/BackgroundBox';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Image } from '@/components/Image';
import SidebarButton from './SidebarButton';
import { getImageSrc } from '@/utils/helpers';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const LongHeader = ({ isLoggedIn }) => {
  return (
    <Wrapper>
      <BackgroundBox borderRadius="0 0 1.6rem 1.6rem" height="17rem">
        <TopContainer>
          <SidebarButton />
          <StyledHeader>Comepet</StyledHeader>
          {isLoggedIn ? (
            <IconContainer>
              <StyledErrorOutlineIcon />
              <StyledNotificationsActiveIcon />
            </IconContainer>
          ) : (
            <Button
              bgColor="normalWhite"
              type="button"
              width="2.8rem"
              height="2.8rem"
              borderRadius="50%"
              margin="0 1rem 0 0">
              <Image alt="로그인" width="2.8rem" height="2.8rem" type="profile" />
            </Button>
          )}
        </TopContainer>
        <MiddleContainer>
          <BackgroundBox width="15rem" boxShadow="0px 4px 16px rgba(0, 0, 0, 0.08)">
            <Button
              bgColor="normalWhite"
              type="button"
              color="brand"
              fontWeight="bold"
              borderRadius="1.6rem">
              <Image
                src={getImageSrc('/images/finding.png')}
                width="1.6rem"
                height="1.6rem"
                margin="0 0.5rem 0 0"
              />
              실종 및 보호
            </Button>
          </BackgroundBox>
          <BackgroundBox width="15rem" boxShadow="0px 4px 16px rgba(0, 0, 0, 0.08)">
            <Button
              bgColor="normalWhite"
              type="button"
              color="brand"
              fontWeight="bold"
              borderRadius="1.6rem">
              <Image
                src={getImageSrc('/images/home.png')}
                width="1.6rem"
                height="1.6rem"
                margin="0 0.5rem 0 0"
              />
              보호소 동물
            </Button>
          </BackgroundBox>
        </MiddleContainer>
        <BottomContainer>
          <Input placeholder="세부 검색을 위해 클릭해주세요" borderRadius="1.6rem" />
          <StyledSearchIcon />
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

const StyledHeader = styled.h1`
  color: ${({ theme }) => theme.colors.brand};
`;

const IconContainer = styled.div`
  margin-right: 1.2rem;
`;

const StyledNotificationsActiveIcon = styled(NotificationsActiveIcon)`
  font-size: 2.8rem;
  color: ${({ theme }) => theme.colors.brand};
`;

const StyledErrorOutlineIcon = styled(ErrorOutlineIcon)`
  font-size: 2.8rem;
  margin-right: 0.8rem;
  color: ${({ theme }) => theme.colors.brand};
`;

const MiddleContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 0.8rem;
`;

const BottomContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin: 1.6rem 2.8rem 0 2.8rem;
`;

const StyledSearchIcon = styled(SearchIcon)`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  right: 2%;
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.brand};
`;

LongHeader.propTypes = {
  isLoggedIn: PropTypes.bool
};

export default LongHeader;
