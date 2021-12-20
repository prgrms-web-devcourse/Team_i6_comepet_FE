import { useState } from 'react';
import styled from '@emotion/styled';
import { ShortHeader } from '@/components/Header';
import { Button } from '@/components/Button';
import { MissingScrap, ShelterScrap } from './scraps';

const MyScrapPage = () => {
  const [isMissingActive, setIsMissingActive] = useState(true);
  const [isShelterActive, setIsShelterActive] = useState(false);

  const handleButton = ({ target }) => {
    if (target.id === 'missing') {
      setIsMissingActive(true);
      setIsShelterActive(false);
    } else if (target.id === 'shelter') {
      setIsMissingActive(false);
      setIsShelterActive(true);
    }
  };

  return (
    <Wrapper>
      <ShortHeader location="내가 저장한 글" />
      <ContentWrapper>
        <ButtonWrapper onClick={handleButton}>
          <Button
            id="missing"
            margin="0 0.8rem 0 0"
            width="6.4rem"
            height="2.8rem"
            fontSize="1rem"
            fontWeight="bold"
            bgColor={isMissingActive ? 'brand' : 'lightGray'}>
            실종 / 보호
          </Button>
          <Button
            id="shelter"
            margin="0 0 0 0.8rem"
            width="6.4rem"
            height="2.8rem"
            fontSize="1rem"
            fontWeight="bold"
            bgColor={isShelterActive ? 'brand' : 'lightGray'}>
            보호소
          </Button>
        </ButtonWrapper>
        <MissingScrap isVisible={isMissingActive} />
        <ShelterScrap isVisible={isShelterActive} />
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 76.8rem;
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

export default MyScrapPage;
