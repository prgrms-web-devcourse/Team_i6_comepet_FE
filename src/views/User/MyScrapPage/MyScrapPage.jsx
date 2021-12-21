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
  const [isMissingActive, setIsMissingActive] = useState(true);
  const [isShelterActive, setIsShelterActive] = useState(false);

  const handleButton = ({ target }) => {
    if (target.id === 'missing') {
      setStatus('missing');
      setIsMissingActive(true);
      setIsShelterActive(false);
    } else if (target.id === 'shelter') {
      setStatus('shelter');
      setIsMissingActive(false);
      setIsShelterActive(true);
    }
  };

  const { data, size, setSize } = useSWRInfinite(
    (index) => `/me/bookmarks?status=${status}?page=${index}&size=10`,
    GET
  );

  const posts = data?.reduce((prevData, nextData) => {
    return { posts: [...prevData.posts, ...nextData.posts] };
  }).posts;

  const isReachingEnd = data && data[data?.length - 1]?.last;

  const postLength = posts?.length || 0;

  useEffect(() => {
    if (!isReachingEnd && isTargetInView) {
      isTargetInView && setSize(size + 1);
    }
  }, [isTargetInView]);

  if (!data) {
    return (
      <Wrapper>
        <ShortHeader location="내가 저장한 글" />
        <ContentWrapper>
          <ButtonWrapper />
        </ContentWrapper>
      </Wrapper>
    );
  }

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
            bgColor={isMissingActive ? 'brand' : 'lightGray'}
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
            bgColor={isShelterActive ? 'brand' : 'lightGray'}
            onClick={handleButton}>
            보호소
          </Button>
        </ButtonWrapper>
        <MissingWrapper isMissingActive={isMissingActive}>
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
        </MissingWrapper>
        <ShelterWrapper isShelterActive={isShelterActive}>
          {postLength ? (
            <PostCardList>
              {posts.map(({ id, animalKind, sexType, ...props }) => (
                <Link to={`/shelter/${id}`} key={id}>
                  <PostCardWrapper>
                    <PostCard animalKindName={animalKind} sex={sexType} {...props} />
                  </PostCardWrapper>
                </Link>
              ))}
            </PostCardList>
          ) : (
            <NoResultText>저장한 보호소 게시글이 없습니다.</NoResultText>
          )}
        </ShelterWrapper>
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

const Wrapper = styled.div`
  margin: 0 auto;
`;

const ContentWrapper = styled.div`
  margin: 8rem 2.4rem 2.4rem 2.4rem;
`;

const MissingWrapper = styled.div`
  display: ${({ isMissingActive }) => (isMissingActive ? 'block' : 'none')};
`;

const ShelterWrapper = styled.div`
  display: ${({ isShelterActive }) => (isShelterActive ? 'block' : 'none')};
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
