import useSWRInfinite from 'swr/infinite';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { GET } from '@/apis/axios';
import styled from '@emotion/styled';
import { ShortHeader } from '@/components/Header';
import { Button } from '@/components/Button';
import { PostCard } from '@/components/PostCard';

const MyScrapPage = () => {
  const [status, setStatus] = useState('missing');
  const [target, isTargetInView] = useInView();
  const { data, size, setSize } = useSWRInfinite(
    (index) => `/me/bookmarks?status=${status}&page=${index}&size=10`,
    GET
  );

  const posts = data?.reduce((prevData, nextData) => {
    return { posts: [...prevData?.posts, ...nextData?.posts] };
  })?.posts;

  const isReachingEnd = data && data[data?.length - 1]?.last;
  const postLength = posts?.length || 0;

  useEffect(() => {
    if (!isReachingEnd && isTargetInView) {
      setSize(size + 1);
    }
  }, [isTargetInView]);

  const handleButton = ({ target }) => {
    const TYPE = target.id;

    if (TYPE === 'missing') {
      setStatus('missing');
    } else if (TYPE === 'shelter') {
      setStatus('shelter');
    }
  };

  return (
    <Wrapper>
      <ShortHeader location="내가 저장한 글" />
      <ContentWrapper>
        <ButtonWrapper>
          <Button
            id="missing"
            margin="0 0.8rem 0 0"
            width="6.4rem"
            height="2.8rem"
            fontSize="1rem"
            fontWeight="bold"
            bgColor={status === 'missing' ? 'brand' : 'lightGray'}
            onClick={handleButton}>
            실종 / 보호
          </Button>
          <Button
            id="shelter"
            margin="0 0 0 0.8rem"
            width="6.4rem"
            height="2.8rem"
            fontSize="1rem"
            fontWeight="bold"
            bgColor={status === 'shelter' ? 'brand' : 'lightGray'}
            onClick={handleButton}>
            보호소
          </Button>
        </ButtonWrapper>
        {postLength ? (
          <PostCardList>
            {posts.map(({ id, animalKind, sexType, ...props }) => (
              <Link to={`/post/${id}`} key={id}>
                <PostCardWrapper>
                  <PostCard animalKindName={animalKind} sex={sexType} {...props} />
                </PostCardWrapper>
              </Link>
            ))}
          </PostCardList>
        ) : (
          <NoResultText>저장한 실종/보호 게시글이 없습니다.</NoResultText>
        )}
        {!isReachingEnd && (
          <Button
            width="50%"
            margin="6rem auto"
            bgColor="brand"
            disabled={isReachingEnd}
            onClick={() => setSize(size + 1)}>
            더보기
          </Button>
        )}
        <div ref={target} />
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0 auto;
  height: 100%;
`;

const ContentWrapper = styled.div`
  margin: 0 2.4rem 2.4rem 2.4rem;
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

const ButtonWrapper = styled.div`
  margin-bottom: 2.8rem;
  display: flex;
  justify-content: center;
`;

export default MyScrapPage;
