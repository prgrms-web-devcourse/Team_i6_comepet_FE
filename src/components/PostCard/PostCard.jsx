import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { BackgroundBox } from '@/components/BackgroundBox';
import { Image } from '@/components/Image';
import { ScrapCounter } from '@/components/ScrapCounter';
import { StatusTag } from '@/components/StatusTag';
import { GENDER } from '@/utils/constants';
import { formatDate } from '@/utils/helpers';

const PostCard = ({
  city,
  town,
  animalKind,
  status,
  createdAt,
  sex,
  isBookmark,
  bookmarkCount,
  postTags,
  thumbnail,
  width,
  height
}) => {
  return (
    <Wrapper>
      <BackgroundBox width={width || '144px'} height={height || '211px'}>
        <StatusTag status={status}></StatusTag>
        <Image
          src={thumbnail}
          width={width || '144px'}
          height="126px"
          borderRadius="1.6rem 1.6rem 0 0"></Image>
        <ScrapCounter size="small" isBookmark={isBookmark}>
          {bookmarkCount}
        </ScrapCounter>
        <Content>
          <Title>
            {animalKind} {GENDER[sex]}
          </Title>
          <Area>
            {city} {town}
          </Area>
          <PostTags>
            {postTags.map(({ id, name }) => (
              <PostTag key={id}>#{name} </PostTag>
            ))}
          </PostTags>
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
  postTags: PropTypes.array,
  thumbnail: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
};

export default PostCard;
