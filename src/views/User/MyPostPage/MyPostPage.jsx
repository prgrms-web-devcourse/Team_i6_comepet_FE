import useSWRInfinite from 'swr/infinite';
import { GET } from '@/apis/axios';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { ShortHeader } from '@/components/Header';
import { PostCard } from '@/components/PostCard';
import { Button } from '@/components/Button';

const MyPostPage = () => {
  const [target, isTargetInView] = useInView();
  const { data, size, setSize } = useSWRInfinite((index) => `/me/posts?page=${index}&size=6`, GET);

  const posts = data?.reduce((prevData, nextData) => {
    return { posts: [...prevData.posts, ...nextData.posts] };
  }).posts;

  const isReachingEnd = data && data[data?.length - 1]?.last;

  const postLength = posts?.length || 0;

  useEffect(() => {
    isTargetInView && setSize(size + 1);
  }, [isTargetInView]);

  if (!data) {
    return (
      <Wrapper>
        <ShortHeader location="내가 쓴 글" />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <ShortHeader location="내가 쓴 글" />
      <ContentWrapper>
        {postLength ? (
          <PostCardList>
            {posts.map(({ id, animalKind, date, postTags, ...props }) => (
              <PostCardWrapper key={id}>
                <Link to={`/post/${id}`}>
                  <PostCard
                    postId={id}
                    animalKindName={animalKind}
                    createdAt={date}
                    tags={postTags}
                    {...props}
                  />
                </Link>
              </PostCardWrapper>
            ))}
          </PostCardList>
        ) : (
          <NoResultText>내가 쓴 글이 없습니다.</NoResultText>
        )}
        <Button
          width="50%"
          margin="6rem auto"
          bgColor="brand"
          disabled={isReachingEnd}
          onClick={() => setSize(size + 1)}>
          {(isReachingEnd && '마지막') || '더보기'}
        </Button>
        <div ref={target} />
      </ContentWrapper>
    </Wrapper>
  );
};

export default MyPostPage;

const Wrapper = styled.div`
  margin: 0 auto;
  padding-bottom: 2rem;
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
