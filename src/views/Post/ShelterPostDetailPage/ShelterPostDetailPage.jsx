import React from 'react';
import styled from '@emotion/styled';
import { ShortHeader } from '@/components/Header';
import { BackgroundBox } from '@/components/BackgroundBox';
import { Slider } from '@/components/Slider';
import { Label } from '@/components/Label';
import { Seperator } from '@/components/Seperator';
import { ScrapCounter } from '@/components/ScrapCounter';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

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

const ShelterPostDetailPage = () => {
  const Sex = 'F';
  return (
    <Wrapper>
      <ShortHeader location="보호 정보" />
      <BackgroundBox margin="6rem 0 2.4rem 0">
        <ImageWrapper>
          <Slider imageList={imageList} borderRadius="1.6rem 1.6rem 0 0" />
          <ScrapCounterWrapper>
            <ScrapCounter size="medium">5</ScrapCounter>
          </ScrapCounterWrapper>
        </ImageWrapper>
        <TextContentWrapper>
          <AnimalProfileWrapper>
            <Animal>강아지/</Animal>
            <Kinds>골든리트리버</Kinds>
            {(Sex === 'M' && <StyledMaleIcon />) || (Sex === 'F' && <StyledFemaleIcon />)}
          </AnimalProfileWrapper>
          <LabelWrapper>
            <Label fontSize="1.2rem" bgColor="normalGreen">
              공고 정보
            </Label>
            <Seperator margin="0 1rem 0 1rem" width="100%" bgColor="normalGreen" type="horizon" />
          </LabelWrapper>
          <LabelWrapper>
            <Label fontSize="1.2rem" bgColor="brand">
              공고 번호
            </Label>
            <Text>경남-진주-2021-00624</Text>
          </LabelWrapper>
          <LabelWrapper>
            <Label fontSize="1.2rem" bgColor="brand">
              공고 시작일
            </Label>
            <Text>2021년 11월 25일</Text>
          </LabelWrapper>
          <LabelWrapper>
            <Label fontSize="1.2rem" bgColor="brand">
              공고 종료일
            </Label>
            <Text>2021년 11월 25일</Text>
          </LabelWrapper>
          <LabelWrapper>
            <Label fontSize="1.2rem" bgColor="normalGreen">
              동물 정보
            </Label>
            <Seperator margin="0 1rem 0 1rem" width="100%" bgColor="normalGreen" type="horizon" />
          </LabelWrapper>
          <LabelWrapper>
            <Label fontSize="1.2rem" bgColor="brand">
              상태
            </Label>
            <Text>안락사</Text>
          </LabelWrapper>
          <LabelWrapper>
            <Label fontSize="1.2rem" bgColor="brand">
              특징
            </Label>
            <Text>순함</Text>
          </LabelWrapper>
          <LabelWrapper>
            <Label fontSize="1.2rem" bgColor="brand">
              체중
            </Label>
            <Text>7.2(kg)</Text>
          </LabelWrapper>
          <LabelWrapper>
            <Label fontSize="1.2rem" bgColor="brand">
              나이
            </Label>
            <Text>2018(년생)</Text>
          </LabelWrapper>
          <LabelWrapper>
            <Label fontSize="1.2rem" bgColor="brand">
              색깔
            </Label>
            <Text>흰색</Text>
          </LabelWrapper>
          <LabelWrapper>
            <Label fontSize="1.2rem" bgColor="brand">
              발견 장소
            </Label>
            <Text>진주시 일반성면 창촌리 56</Text>
          </LabelWrapper>
          <LabelWrapper>
            <Label fontSize="1.2rem" bgColor="brand">
              중성화 여부
            </Label>
            <Text>N</Text>
          </LabelWrapper>
          <LabelWrapper>
            <Label fontSize="1.2rem" bgColor="normalGreen">
              동물 정보
            </Label>
            <Seperator margin="0 1rem 0 1rem" width="100%" bgColor="normalGreen" type="horizon" />
          </LabelWrapper>
          <LabelWrapper>
            <Label fontSize="1.2rem" bgColor="brand">
              보호 장소
            </Label>
            <Text>경상남도 진주시 집현면 신당길207번길 22 (집현면, 지역농업개발시설)</Text>
          </LabelWrapper>
          <LabelWrapper>
            <Label fontSize="1.2rem" bgColor="brand">
              보호소 이름
            </Label>
            <Text>진주시청</Text>
          </LabelWrapper>
          <LabelWrapper>
            <Label fontSize="1.2rem" bgColor="brand">
              보호소 전화번호
            </Label>
            <Text>055-749-6134</Text>
          </LabelWrapper>
          <LabelWrapper>
            <Label fontSize="1.2rem" bgColor="brand">
              담당자 전화번호
            </Label>
            <Text>055-749-5645</Text>
          </LabelWrapper>
        </TextContentWrapper>
      </BackgroundBox>
    </Wrapper>
  );
};

export default ShelterPostDetailPage;

const Wrapper = styled.form`
  padding: 2.4rem;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 20.4rem;
`;

const ScrapCounterWrapper = styled.div`
  position: absolute;
  right: 0;
  bottom: 13.2rem;
`;

const TextContentWrapper = styled.div`
  padding: 1.2rem;
`;

const AnimalProfileWrapper = styled.div`
  margin: 1rem 0;
  padding: 0 1rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Animal = styled.span`
  font-size: 1.8rem;
  font-weight: bold;
`;

const Kinds = styled.span`
  font-size: 1.8rem;
  font-weight: bold;
`;

const StyledMaleIcon = styled(MaleIcon)`
  font-size: 2.4rem;
  color: ${({ theme }) => theme.colors.normalGreen};
`;

const StyledFemaleIcon = styled(FemaleIcon)`
  font-size: 2.6rem;
  color: ${({ theme }) => theme.colors.normalGreen};
`;

const LabelWrapper = styled.div`
  display: flex;
  margin-top: 2rem;
  justify-content: center;
  align-items: center;
`;

const Text = styled.span`
  margin-left: 1rem;
  width: 65%;
  flex-grow: 1;
  font-size: 1.2rem;
  font-weight: bold;
  word-break: keep-all;
  word-wrap: break-word;
`;
