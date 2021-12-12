import React from 'react';
import styled from '@emotion/styled';
import { LongHeader } from '@/components/Header';
import { SortHeader } from '@/views/Main/SortHeader';
import { PostCard } from '@/components/PostCard';
import { shelterData } from '@/assets/data.js';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ShelterPostPage = () => {
  const { shelters: posts } = shelterData; // useSwr
  const postLength = posts.length;
  // temp
  const city = '서울특별시';
  const town = '도봉구';

  return (
    <Wrapper>
      <LongHeader />
      <ContentWrapper>
        <Notice>
          <NoticeDetails>
            <StyledErrorOutlineIconButton>
              <StyledErrorOutlineIcon />
            </StyledErrorOutlineIconButton>
            <NoticeBoldText>
              <NoticeButton>여기</NoticeButton>를 클릭해 관련 동물 보호법을 숙지해 주세요
            </NoticeBoldText>
          </NoticeDetails>
          <NoticeText>
            공고 중인 동물의 주인께서는 해당 시군구나 보호센터에 문의해 주세요
          </NoticeText>
        </Notice>
        <SortHeader city={city} town={town} postLength={postLength} />
        {postLength ? (
          <PostCardList>
            {posts.map(({ id, ...props }) => (
              <PostCardWrapper key={id}>
                <PostCard {...props} height="18.5rem" />
              </PostCardWrapper>
            ))}
          </PostCardList>
        ) : (
          <NoResultText>검색 결과가 없습니다.</NoResultText>
        )}
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0 auto;
`;

const Notice = styled.div`
  margin: 1.6rem 0;
`;

const NoticeDetails = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 0.8rem 0;
`;

const StyledErrorOutlineIconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0 0.2rem 0.2rem 0;
`;

const StyledErrorOutlineIcon = styled(ErrorOutlineIcon)`
  width: 1.4rem;
  height: 1.4rem;
  margin: 0;
  font-size: 2.8rem;
  color: ${({ theme }) => theme.colors.brand};
`;

const NoticeBoldText = styled.span`
  font-weight: bold;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.brand};
`;

const NoticeButton = styled.button`
  padding: 0;
  font-weight: bold;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.normalGreen};
`;

const NoticeText = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.brand};
`;

const ContentWrapper = styled.div`
  padding: 17rem 2.4rem 2.4rem 2.4rem;
`;

const PostCardList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  justify-content: center;
`;

const PostCardWrapper = styled.li`
  justify-self: center;
`;

const NoResultText = styled.div`
  padding: 12rem 4rem;
  font-size: 1.6rem;
  font-weight: bold;
  text-align: center;
  color: ${({ theme }) => theme.colors.normalGray};
`;

export default ShelterPostPage;
