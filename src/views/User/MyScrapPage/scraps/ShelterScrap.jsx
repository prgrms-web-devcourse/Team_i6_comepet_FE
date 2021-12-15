import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { PostCard } from '@/components/PostCard';
import { shelterData } from '@/assets/data.js';

const ShelterScrap = ({ isVisible }) => {
  const { shelters } = shelterData;
  const sheltersLength = shelters.length;

  return (
    <ShelterWrapper isVisible={isVisible}>
      {sheltersLength ? (
        <PostCardList>
          {shelters.map(
            ({ id, isBookmark, ...props }) =>
              !isBookmark && (
                <PostCardWrapper key={id}>
                  <PostCard isBookmark {...props} />
                </PostCardWrapper>
              )
          )}
        </PostCardList>
      ) : (
        <NoResultText>저장한 보호소 게시글이 없습니다.</NoResultText>
      )}
    </ShelterWrapper>
  );
};

const ShelterWrapper = styled.div`
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

ShelterScrap.propTypes = {
  isVisible: PropTypes.bool.isRequired
};

export default ShelterScrap;
