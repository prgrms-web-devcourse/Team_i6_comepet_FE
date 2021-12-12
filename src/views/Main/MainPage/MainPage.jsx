import React from 'react';
import styled from '@emotion/styled';
import { LongHeader } from '@/components/Header';
import { PostCard } from '@/components/PostCard';
import { postsData } from '@/assets/data.js';
import { SelectionBox } from '@/components/SelectionBox';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const MainPage = () => {
  const { posts } = postsData; // useSwr
  const postLength = posts.length;
  // temp
  const city = '서울특별시';
  const town = '도봉구';

  return (
    <Wrapper>
      <LongHeader />
      <ContentWrapper>
        <SortHeader>
          {`${city} ${town} 검색 결과 ${postLength}건`}
          <SelectionBox
            options={['오래된순 정렬']}
            defaultOption="최신순 정렬"
            fontSize="1.2rem"
            fontColor="normalGray"
          />
        </SortHeader>
        {postLength ? (
          <PostCardList>
            {posts.map(({ id, ...props }) => (
              <PostCardWrapper key={id}>
                <PostCard {...props} />
              </PostCardWrapper>
            ))}
          </PostCardList>
        ) : (
          <NoResultText>검색 결과가 없습니다.</NoResultText>
        )}
      </ContentWrapper>
      <Link>
        <StyledAddCircleIcon />
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0 auto;
`;

const ContentWrapper = styled.div`
  padding: 17rem 2.4rem 2.4rem 2.4rem;
`;

const SortHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.4rem 0;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.brand};
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

// react-router Link로 교체 필요
const Link = styled.button`
  position: fixed;
  right: 0;
  bottom: 0;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  margin: 0 0 1.2rem 0;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.normalWhite};
`;

const StyledAddCircleIcon = styled(AddCircleIcon)`
  width: 5rem;
  height: 5rem;
  color: ${({ theme }) => theme.colors.normalOrange};
`;

export default MainPage;
