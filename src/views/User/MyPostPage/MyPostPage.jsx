import React from 'react';
import useSWR from 'swr';
import { GET } from '@/apis/axios';
import styled from '@emotion/styled';
import { ShortHeader } from '@/components/Header';
import { PostCard } from '@/components/PostCard';

const MyPostPage = () => {
  const { data } = useSWR('/me/posts', GET);
  console.log(data);
  const postLength = data?.posts.length;
  return (
    <Wrapper>
      <ShortHeader location="내가 쓴 글" />
      <ContentWrapper>
        {postLength ? (
          <PostCardList>
            {data?.posts.map(({ id, animalKind, date, postTags, ...props }) => (
              <PostCardWrapper key={id}>
                <PostCard
                  postId={id}
                  animalKindName={animalKind}
                  createdAt={date}
                  tags={postTags}
                  {...props}
                />
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
