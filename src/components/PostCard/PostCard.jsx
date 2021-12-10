import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { BackgroundBox } from '@/components/BackgroundBox';
import { Image } from '@/components/Image';
import { ScrapCounter } from '@/components/ScrapCounter';
import { StatusTag } from '@/components/StatusTag';
import { formatDate } from '@/utils/helpers';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

const PostCard = ({
  city,
  town,
  animalKind,
  status,
  createdAt,
  sex,
  isBookmark,
  bookmarkCount,
  tags,
  thumbnail,
  shelterPlace,
  width,
  height
}) => {
  return (
    <Wrapper>
      <BackgroundBox width={width || '14.4rem'} height={height || '21.1rem'}>
        {!shelterPlace && <StatusTag status={status} />}
        <Image
          src={thumbnail}
          width={width || '14.4rem'}
          height="12.6rem"
          borderRadius="1.6rem 1.6rem 0 0"></Image>
        <ScrapCounter size="small" isBookmark={isBookmark}>
          {bookmarkCount}
        </ScrapCounter>
        <Content>
          <Title>
            {animalKind === 'UNKNOWN' ? '종류 모름' : animalKind}
            {(sex === 'MALE' && <StyledMaleIcon />) || (sex === 'FEMALE' && <StyledFemaleIcon />)}
          </Title>
          <Area>
            {city} {town}
          </Area>
          {!shelterPlace && (
            <PostTags>
              {tags.map(({ id, name }) => (
                <PostTag key={id}>#{name} </PostTag>
              ))}
            </PostTags>
          )}
          <CreatedAt>{formatDate(createdAt)}</CreatedAt>
        </Content>
      </BackgroundBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-size: 0.8rem;
`;

const Content = styled.div`
  padding: 0.4rem 0.8rem;
`;

const Title = styled.div`
  margin-bottom: 0.4rem;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

const StyledMaleIcon = styled(MaleIcon)`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.normalGreen};
  margin: 0 0 0.1rem 0.1rem;
`;

const StyledFemaleIcon = styled(FemaleIcon)`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.normalGreen};
  margin: 0 0 0.1rem 0.1rem;
`;

const Area = styled.div`
  margin-bottom: 0.4rem;
`;

const PostTags = styled.ul`
  margin-bottom: 0.4rem;
  color: ${({ theme }) => theme.colors.normalGray};
`;

const PostTag = styled.li`
  display: inline;
`;

const CreatedAt = styled.div`
  margin-bottom: 0.4rem;
`;

PostCard.propTypes = {
  city: PropTypes.string,
  town: PropTypes.string,
  animalKind: PropTypes.string,
  status: PropTypes.string,
  createdAt: PropTypes.string,
  sex: PropTypes.string,
  isBookmark: PropTypes.bool,
  bookmarkCount: PropTypes.number,
  tags: PropTypes.array,
  thumbnail: PropTypes.string,
  shelterPlace: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
};

export default PostCard;
