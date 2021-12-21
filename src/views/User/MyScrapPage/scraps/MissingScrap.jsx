import useSWRInfinite from 'swr/infinite';
import { GET } from '@/apis/axios';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { PostCard } from '@/components/PostCard';
import { Button } from '@/components/Button';

const MissingScrap = ({ isVisible }) => {
  const [target, isTargetInView] = useInView();
  const { data, size, setSize } = useSWRInfinite(
    (index) => `/me/bookmarks?status=missing?page=${index}&size=10`,
    GET
  );

  const posts = data?.reduce((prevData, nextData) => {
    return { posts: [...prevData.posts, ...nextData.posts] };
  }).posts;

  console.log(posts);

  const isReachingEnd = data && data[data?.length - 1]?.last;

  const postLength = posts?.length || 0;

  useEffect(() => {
    if (!isReachingEnd && isTargetInView) {
      isTargetInView && setSize(size + 1);
    }
  }, [isTargetInView]);

  if (!data) {
    return <MissingWrapper isVisible={isVisible}></MissingWrapper>;
  }

  return (
    <MissingWrapper isVisible={isVisible}>
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
      <Button
        width="50%"
        margin="6rem auto"
        bgColor="brand"
        disabled={isReachingEnd}
        onClick={() => setSize(size + 1)}>
        {(isReachingEnd && '마지막') || '더보기'}
      </Button>
      <div ref={target} />
    </MissingWrapper>
  );
};

const MissingWrapper = styled.div`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
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

MissingScrap.propTypes = {
  isVisible: PropTypes.bool.isRequired
};

export default MissingScrap;
