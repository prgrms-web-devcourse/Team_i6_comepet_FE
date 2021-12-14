import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { PostCard } from '@/components/PostCard';
import { postsData } from '@/assets/data.js';

const MissingScrap = ({ isVisible }) => {
  const { posts } = postsData;
  const postLength = posts.length;
  return (
    <MissingWrapper isVisible={isVisible}>
      {postLength ? (
        <PostCardList>
          {posts.map(
            ({ id, isBookmark, ...props }) =>
              !isBookmark && (
                <PostCardWrapper key={id}>
                  <PostCard isBookmark {...props} />
                </PostCardWrapper>
              )
          )}
        </PostCardList>
      ) : (
        <NoResultText>저장한 실종/보호 게시글이 없습니다.</NoResultText>
      )}
    </MissingWrapper>
  );
};

MissingScrap.propTypes = {
  isVisible: PropTypes.bool.isRequired
};
export default MissingScrap;

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
