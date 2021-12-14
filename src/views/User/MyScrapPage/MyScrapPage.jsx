import React from 'react';
import styled from '@emotion/styled';
import { ShortHeader } from '@/components/Header';
import { Button } from '@/components/Button';
import { MissingScrap, ShelterScrap } from './scraps';

const MyScrapPage = () => {
  const [isMissingActive, setIsMissingActive] = React.useState(true);
  const [isShelterActive, setIsShelterActive] = React.useState(false);

  return (
    <Wrapper>
      <ShortHeader location="내가 저장한 글" />
      <ContentWrapper>
        <ButtonWrapper>
          <Button
            margin="0 0.8rem 0 0"
            width="6.4rem"
            height="2.8rem"
            fontSize="1rem"
            fontWeight="bold"
            bgColor={isMissingActive ? 'brand' : 'lightGray'}
            onClick={() => {
              setIsMissingActive(true);
              setIsShelterActive(false);
            }}>
            실종 / 보호
          </Button>
          <Button
            margin="0 0 0 0.8rem"
            width="6.4rem"
            height="2.8rem"
            fontSize="1rem"
            fontWeight="bold"
            bgColor={isShelterActive ? 'brand' : 'lightGray'}
            onClick={() => {
              setIsShelterActive(true);
              setIsMissingActive(false);
            }}>
            보호소
          </Button>
        </ButtonWrapper>
        <MissingScrap isVisible={isMissingActive} />
        <ShelterScrap isVisible={isShelterActive} />
      </ContentWrapper>
    </Wrapper>
  );
};

export default MyScrapPage;

const Wrapper = styled.div`
  margin: 0 auto;
`;

const ContentWrapper = styled.div`
  margin: 8rem 2.4rem 2.4rem 2.4rem;
`;
const ButtonWrapper = styled.div`
  margin-bottom: 2.8rem;
  display: flex;
  justify-content: center;
`;
