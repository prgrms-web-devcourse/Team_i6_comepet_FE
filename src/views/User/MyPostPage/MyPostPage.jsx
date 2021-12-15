import React from 'react';
import styled from '@emotion/styled';
import { ShortHeader } from '@/components/Header';
import { PostCard } from '@/components/PostCard';
import { postsData } from '@/assets/data.js';

const MyPostPage = () => {
  const { posts } = postsData;
  const postLength = posts.length;
  return (
    <Wrapper>
      <ShortHeader location="내가 쓴 글" />
      <ContentWrapper>
        {postLength ? (
          <PostCardList>
            {posts.map(({ id, ...props }) => (
              <PostCardWrapper key={id}>
                <PostCard {...props} />
              </PostCardWrapper>
            ))}
          </PostCardList>
        ) : (
          <NoResultText>내가 쓴 글이 없습니다.</NoResultText>
        )}
      </ContentWrapper>
    </Wrapper>
  );
};

export default MyPostPage;

const Wrapper = styled.div`
  margin: 0 auto;
`;

const ContentWrapper = styled.div`
  margin: 10rem 2.4rem 2.4rem 2.4rem;
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
  padding: 18rem 4rem;
  font-size: 1.6rem;
  font-weight: bold;
  text-align: center;
  color: ${({ theme }) => theme.colors.normalGray};
`;
