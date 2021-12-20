import axios from 'axios';
import { GET, DELETE } from '@/apis/axios';
import useSWR, { mutate } from 'swr';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { ShortHeader } from '@/components/Header';
import { BackgroundBox } from '@/components/BackgroundBox';
import { Image } from '@/components/Image';
import { Label } from '@/components/Label';
import { Seperator } from '@/components/Seperator';
import { ScrapCounter } from '@/components/ScrapCounter';
import { Button } from '@/components/Button';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

const ShelterPostDetailPage = () => {
  const { id } = useParams();
  const { data } = useSWR(`/shelter-posts/${id}`, GET);
  const [isBookmarkOn, setIsBookmarkOn] = useState(null);

  useEffect(() => {
    setIsBookmarkOn(data?.isBookmark);
  }, [data]);

  const handleBookmarkClick = async () => {
    if (isBookmarkOn) {
      await DELETE(`shelter-posts/${id}/bookmark`);
    } else if (!isBookmarkOn) {
      await axios.post(`shelter-posts/${id}/bookmark`).catch(function (error) {
        console.log(error);
      });
    }
    mutate(`/shelter-posts/${id}`);
  };

  return (
    <Wrapper>
      <ShortHeader location="보호 정보" />
      <BackgroundBox margin="6rem 0 2.4rem 0">
        <ImageWrapper>
          <Image src={data?.image} width="100%" height="100%" />
          <Button
            position="absolute"
            right="0"
            bottom="-0.3rem"
            bgColor="brand"
            width="4.8rem"
            height="2.1rem"
            onClick={handleBookmarkClick}>
            <ScrapCounter size="medium" isBookmark={isBookmarkOn}>
              {data?.bookmarkCount}
            </ScrapCounter>
          </Button>
        </ImageWrapper>
        <TextContentWrapper>
          <AnimalProfileWrapper>
            <Animal>{data?.animal}/</Animal>
            <Kinds>{data?.animalKindName}</Kinds>
            {data?.sex === 'Male' ? <StyledMaleIcon /> : <StyledFemaleIcon />}
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
            <Text>{data?.noticeNumber}</Text>
          </LabelWrapper>
          <LabelWrapper>
            <Label fontSize="1.2rem" bgColor="brand">
              공고 시작일
            </Label>
            <Text>{data?.startDate}</Text>
          </LabelWrapper>
          <LabelWrapper>
            <Label fontSize="1.2rem" bgColor="brand">
              공고 종료일
            </Label>
            <Text>{data?.endDate}</Text>
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
            <Text>{data?.status}</Text>
          </LabelWrapper>
          <LabelWrapper>
            <Label fontSize="1.2rem" bgColor="brand">
              특징
            </Label>
            <Text>{data?.feature}</Text>
          </LabelWrapper>
          <LabelWrapper>
            <Label fontSize="1.2rem" bgColor="brand">
              체중
            </Label>
            <Text>{data?.weight}(kg)</Text>
          </LabelWrapper>
          <LabelWrapper>
            <Label fontSize="1.2rem" bgColor="brand">
              나이
            </Label>
            <Text>{data?.age}(년생)</Text>
          </LabelWrapper>
          <LabelWrapper>
            <Label fontSize="1.2rem" bgColor="brand">
              색깔
            </Label>
            <Text>{data?.color}</Text>
          </LabelWrapper>
          <LabelWrapper>
            <Label fontSize="1.2rem" bgColor="brand">
              발견 장소
            </Label>
            <Text>{data?.foundPlace}</Text>
          </LabelWrapper>
          <LabelWrapper>
            <Label fontSize="1.2rem" bgColor="brand">
              중성화 여부
            </Label>
            <Text>{data?.neutered}</Text>
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
            <Text>{data?.shelterPlace}</Text>
          </LabelWrapper>
          <LabelWrapper>
            <Label fontSize="1.2rem" bgColor="brand">
              보호소 이름
            </Label>
            <Text>{data?.shelterName}</Text>
          </LabelWrapper>
          <LabelWrapper>
            <Label fontSize="1.2rem" bgColor="brand">
              보호소 전화번호
            </Label>
            <Text>{data?.shelterTelNumber}</Text>
          </LabelWrapper>
          <LabelWrapper>
            <Label fontSize="1.2rem" bgColor="brand">
              담당자 전화번호
            </Label>
            <Text>{data?.managerTelNumber}</Text>
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
  width: 100%;
  height: 20.4rem;
  border-radius: 1.6rem 1.6rem 0 0;
  overflow: hidden;
  position: relative;
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
