import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import useSWRInfinite from 'swr/infinite';
import { useInView } from 'react-intersection-observer';
import { LongHeader } from '@/components/Header';
import { SortHeader } from '@/views/Main/SortHeader';
import { PostCard } from '@/components/PostCard';
import { Button } from '@/components/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { GET } from '@/apis/axios';
import { DEV_ERROR } from '@/utils/constants';

const MainPage = () => {
  const [target, targetInView] = useInView();
  const { data, error, size, setSize } = useSWRInfinite(
    (index) => `/missing-posts?page=${index + 1}&size=6`,
    GET
  );

  error && alert(DEV_ERROR.LOAD_FAILED);

  const posts = data?.reduce((prevData, nextData) => {
    return { missingPosts: [...prevData.missingPosts, ...nextData.missingPosts] };
  }).missingPosts;

  const isReachingEnd = data && data[data?.length - 1]?.last;
  const city = posts && posts[0]?.city; // temp
  const town = posts && posts[0]?.town; // temp
  const postLength = posts?.length || 0;

  useEffect(() => {
    targetInView && setSize(size + 1);
  }, [targetInView]);

  return (
    <Wrapper>
      <LongHeader />
      <ContentWrapper>
        <SortHeader city={city || '전체'} town={town || ''} postLength={postLength} />
        {postLength ? (
          <PostCardList>
            {posts.map(({ id, ...props }) => (
              <PostCardWrapper key={id}>
                <PostCard postId={id} {...props} />
              </PostCardWrapper>
            ))}
          </PostCardList>
        ) : (
          <NoResultText>검색 결과가 없습니다.</NoResultText>
        )}
        <Button
          width="50%"
          margin="6rem auto"
          bgColor="brand"
          disabled={isReachingEnd}
          onClick={() => setSize(size + 1)}>
          {(isReachingEnd && '마지막') || '더보기'}
        </Button>
      </ContentWrapper>
      <StyledLink to="/post/create">
        <StyledAddCircleIcon />
      </StyledLink>
      <div ref={target}></div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0 auto;
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

const StyledLink = styled(Link)`
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 2;
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
