import React from 'react';
import styled from '@emotion/styled';
// import PropTypes from 'prop-types';
import { Button } from '@/components/Button';
import {
  StatusCategory,
  DateCategory,
  PlaceCategory,
  ContactCategory,
  PetInformationCategory,
  ChipInformationCategory,
  HashTagCategory,
  ContentCategory
} from './Category';
import { Slider } from '@/components/Slider';

// 추후 삭제 예정
// const MARGIN_BETTWEN = Object.freeze({
//   SelectionBox_AND_Label: '1.8rem 0 0 0',
//   Input_AND_Label: '1.8rem 0 0 0',
//   Anything_AND_CheckBox: '0 0 0 1.6rem',
//   SelectionBox: '0 0 0 2rem',
//   CATEGORY: '2.4rem 0 0 0'
// });

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
  return (
    <Wrapper>
      <StatusCategory />
      <DateCategory margin="2.4rem 0 0 0" />
      <PlaceCategory margin="2.4rem 0 0 0" />
      <ContactCategory margin="2.4rem 0 0 0" />
      <PetInformationCategory margin="2.4rem 0 0 0" />
      <ChipInformationCategory margin="2.4rem 0 0 0" />
      <HashTagCategory margin="2.4rem 0 0 0" />
      <PetPhotoContainer margin="2.4rem 0 0 0">
        <Slider imageList={imageList} size="large" />
        <Button width="60%" margin="5% auto 0 auto" bgColor="normalOrange" type="button">
          반려동물 사진 등록
        </Button>
      </PetPhotoContainer>
      <ContentCategory margin="2.4rem 0 0 0" />
      <ButtonContainer margin="3.6rem 0 0 0">
        <Button width="60%" margin="5% auto 0 auto" bgColor="normalOrange" type="button">
          작성하기
        </Button>
        <Button width="60%" margin="5% auto 0 auto" bgColor="brand" type="button">
          취소하기
        </Button>
      </ButtonContainer>
    </Wrapper>
  );
};

const Wrapper = styled.form`
  padding: 1.7rem;
`;
const PetPhotoContainer = styled.div`
  margin: ${({ margin }) => margin};
`;

const ButtonContainer = styled.div`
  margin: ${({ margin }) => margin};
`;

PostCreatePage.propTypes = {};

export default PostCreatePage;
