import React from 'react';
import styled from '@emotion/styled';
// import PropTypes from 'prop-types';
import { BackgroundBox } from '@/components/BackgroundBox';
import { Slider } from '@/components/Slider';
import { Label } from '@/components/Label';
import { Avatar } from '@/components/Avatar';
import { Seperator } from '@/components/Seperator';
import { ScrapCounter } from '@/components/ScrapCounter';
import { StatusTag } from '@/components/StatusTag';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const imageList = [
  {
    image: 'https://images.unsplash.com/photo-1546190255-451a91afc548?ixlib=rb-1.2.1'
  },
  {
    image: 'https://images.unsplash.com/photo-1591348122449-02525d70379b?ixlib=rb-1.2.1'
  },
  {
    image: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?ixlib=rb-1.2.1'
  },
  {
    image: 'https://images.unsplash.com/photo-1577023311546-cdc07a8454d9?ixlib=rb-1.2.1'
  }
];

const PostCreatePage = () => {
  const GENDER = 'Male';
  return (
    <Wrapper>
      <TopWrapper>
        <BackgroundBox>
          <ImageWrapper>
            <Slider imageList={imageList} borderRadius="1.6rem 1.6rem 0 0" />
            <ScrapCounterWrapper>
              <ScrapCounter size="medium">5</ScrapCounter>
            </ScrapCounterWrapper>
            <StatusTagWrapper>
              <StatusTag status="MISSING" />
            </StatusTagWrapper>
          </ImageWrapper>
          <TextContentWrapper>
            <UserInformationWrapper>
              <UserProfileWrapper>
                <Avatar src="" margin="0" size="4.3rem" />
                <ExceptForAvatarWrapper>
                  <NicknameAndCompileIconWrapper>
                    <Nickname>닉네임최대글자수맞춤</Nickname>
                    <StyledMoreVertIcon />
                  </NicknameAndCompileIconWrapper>
                  <PostDateWrapper>
                    <PostDate>2021년 11월 30일 / 조회수 200</PostDate>
                  </PostDateWrapper>
                </ExceptForAvatarWrapper>
              </UserProfileWrapper>
            </UserInformationWrapper>
            <Seperator margin="1.6rem 0" type="horizon" />
            <HeaderWrapper>
              <AnimalInformationWrapper>
                <AnimalWrapper>
                  <Animal>강아지/</Animal>
                  <Kinds>골든리트리버</Kinds>
                  {(GENDER === 'Male' && <StyledMaleIcon />) ||
                    (GENDER === 'Female' && <StyledFemaleIcon />)}
                </AnimalWrapper>
                <HashTag>#최대글자수　#최대글자수　#최대글자수 </HashTag>
                <HashTag>#최대글자수　#최대글자수</HashTag>
              </AnimalInformationWrapper>
            </HeaderWrapper>
            <Seperator margin="1.8rem 0" type="horizon" />
            <ContentWrapper>
              <OneLineWrapper>
                <Label size="xsmall" bgColor="brand">
                  실종
                </Label>
                <OneLineText bgColor="brand">실종</OneLineText>
              </OneLineWrapper>
              <OneLineWrapper>
                <Label size="xsmall" bgColor="brand">
                  실종 날짜
                </Label>
                <OneLineText>2021년 11월 24일</OneLineText>
              </OneLineWrapper>
              <TwoLineWrapper>
                <Label size="xsmall" bgColor="brand">
                  장소
                </Label>
                <TwoLineText>서울특별시 영등포구 당산동 엠스퀘어 앞</TwoLineText>
              </TwoLineWrapper>
              <OneLineWrapper>
                <Label size="xsmall" bgColor="brand">
                  칩 번호
                </Label>
                <OneLineText>1234 567 8912 3456</OneLineText>
              </OneLineWrapper>
              <OneLineWrapper>
                <Label size="xsmall" bgColor="brand">
                  연락처
                </Label>
                <OneLineText>010 1234 5678</OneLineText>
              </OneLineWrapper>
              <TwoLineWrapper>
                <Label size="xsmall" bgColor="brand">
                  내용
                </Label>
                <TwoLineText>목에 레전드라는 이름표를 달고 있습니다</TwoLineText>
              </TwoLineWrapper>
            </ContentWrapper>
          </TextContentWrapper>
          <OtherInformationsWrapper></OtherInformationsWrapper>
        </BackgroundBox>
      </TopWrapper>
      <BottomWrapper>
        <BackgroundBox>
          <CommentHeaderWrapper>
            <CommentCount>
              댓글 <TextHighLight color="normalGreen">2,300</TextHighLight>개
            </CommentCount>
          </CommentHeaderWrapper>
          <Seperator type="horizon" />
          <CommentList>
            <Comment>
              <Avatar src="" size="3.6rem" margin="0"></Avatar>
              <CommentUserProfile>
                <CommentNickname>글자수가최대인경우임</CommentNickname>
                <CommentText>나 어제 당산역 뒷골목에서 이 강아지봄!</CommentText>
              </CommentUserProfile>
              <AdditionalInformation>
                <CommentDate>어제</CommentDate>
                <CompileButton>
                  <StyledMoreHorizIcon></StyledMoreHorizIcon>
                </CompileButton>
              </AdditionalInformation>
            </Comment>
            <Comment>
              <Avatar src="" size="3.6rem" margin="0"></Avatar>
              <CommentUserProfile>
                <CommentNickname>글자수가최대인경우임</CommentNickname>
                <CommentText>나 어제 당산역 뒷골목에서 이 강아지봄!</CommentText>
              </CommentUserProfile>
              <AdditionalInformation>
                <CommentDate>어제</CommentDate>
                <CompileButton>
                  <StyledMoreHorizIcon></StyledMoreHorizIcon>
                </CompileButton>
              </AdditionalInformation>
            </Comment>
          </CommentList>
          <CommentCreateWrapper>
            <InputWrapper>
              <StyledInput placeholder="댓글을 입력해주세요" />
              <StyledArrowCircleRightIcon />
            </InputWrapper>
          </CommentCreateWrapper>
        </BackgroundBox>
      </BottomWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.form`
  padding: 2.4rem;
`;

const TopWrapper = styled.div`
  margin-bottom: 2.4rem;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 20.4rem;
`;

const ScrapCounterWrapper = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
`;

const StatusTagWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

const HeaderWrapper = styled.div`
  position: relative;
`;

const AnimalInformationWrapper = styled.div``;

const AnimalWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 0.8rem;
`;

const Animal = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
`;

const Kinds = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
`;

const StyledMaleIcon = styled(MaleIcon)`
  font-size: 2.4rem;
  color: ${({ theme }) => theme.colors.normalGreen};
`;

const StyledFemaleIcon = styled(FemaleIcon)`
  transform: rotate(-135deg);
  font-size: 2.6rem;
  color: ${({ theme }) => theme.colors.normalGreen};
`;

const HashTag = styled.div`
  margin-top: 0.5rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.normalBlack};
`;

const StyledMoreVertIcon = styled(MoreVertIcon)`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.brand};

  :hover {
    color: red;
  }
`;

const OtherInformationsWrapper = styled.div``;

const UserInformationWrapper = styled.div``;

const UserProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 1rem;
`;

const ExceptForAvatarWrapper = styled.div`
  flex-grow: 1;
  margin-left: 1.6rem;
`;

const NicknameAndCompileIconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
`;

const PostDateWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Nickname = styled.div`
  flex-grow: 1;
  font-size: 1.8rem;
  font-weight: bold;
`;

const PostDate = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.normalGray};
`;

const TextContentWrapper = styled.div`
  padding: 1.2rem;
`;

const ContentWrapper = styled.div``;

const OneLineWrapper = styled.div`
  display: flex;
  flex-direction: center;
  margin: 1.4rem 0;
`;

const TwoLineWrapper = styled.div``;

const OneLineText = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  font-size: 1.2rem;
`;

const TwoLineText = styled.div`
  margin-top: 1rem;
  font-size: 1.2rem;
`;

const BottomWrapper = styled.div``;

const CommentHeaderWrapper = styled.div`
  padding: 1rem 1.6rem;
`;

const CommentCount = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
`;

const TextHighLight = styled.span`
  color: ${({ theme, color }) => theme.colors[color]};
`;

const CommentList = styled.ul`
  padding: 1.6rem;
`;

const Comment = styled.li`
  position: relative;
  display: flex;
  margin-bottom: 2rem;
`;

const CommentUserProfile = styled.div`
  margin-left: 1.6rem;
`;

const CommentNickname = styled.div`
  margin-bottom: 1.2rem;
  font-size: 1.2rem;
  font-weight: bold;
`;

const CommentText = styled.div`
  font-size: 1.2rem;
`;

const AdditionalInformation = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
`;

const CommentDate = styled.div``;

const CompileButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0 0.6rem;
  :hover {
    color: red;
  }
`;

const StyledMoreHorizIcon = styled(MoreHorizIcon)``;

const CommentCreateWrapper = styled.div``;

const InputWrapper = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 4.3rem;
  padding: 1.5rem;
  background-color: #fafafa;
`;

const StyledArrowCircleRightIcon = styled(ArrowCircleRightIcon)`
  position: absolute;
  right: 0.3rem;
  font-size: 4.5rem;
  transform: rotate(-90deg);
  color: ${({ theme }) => theme.colors.normalOrange};
`;

PostCreatePage.propTypes = {};

export default PostCreatePage;
