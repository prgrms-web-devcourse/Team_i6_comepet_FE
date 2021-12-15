import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { BackgroundBox } from '@/components/BackgroundBox';
import { Seperator } from '@/components/Seperator';

import ImageSlider from './ImageSlider/ImageSlider';
import UserProfile from './UserProfile/UserProfile';
import PostHeader from './PostHeader/PostHeader';
import PostContent from './PostContent/PostContent';

const Post = ({ data }) => {
  return (
    <BackgroundBox>
      <ImageSlider bookmarkCount={data.bookmarkCount} status={data.status} />
      <TextContentWrapper>
        <UserProfile user={data.user} viewCount={data.viewCount} createdAt={data.createdAt} />
        <Seperator margin="1.6rem 0" type="horizon" />
        <PostHeader
          animal={data.animal}
          animalKindName={data.animalKindName}
          sex={data.sex}
          postTags={data.postTags}
        />
        <Seperator margin="1.8rem 0" type="horizon" />
        <PostContent
          status={data.status}
          date={data.date}
          city={data.city}
          town={data.town}
          detailAddress={data.detailAddress}
          chipNumber={data.chipNumber}
          telNumber={data.telNumber}
          content={data.content}
        />
      </TextContentWrapper>
    </BackgroundBox>
  );
};

Post.propTypes = {
  data: PropTypes.object
};

const TextContentWrapper = styled.div`
  padding: 1.2rem;
`;

export default Post;
