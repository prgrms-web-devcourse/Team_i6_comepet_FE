import React from 'react';
import styled from '@emotion/styled';
import { BackgroundBox } from '@/components/BackgroundBox';
import { Seperator } from '@/components/Seperator';

import ImageSlider from './ImageSlider/ImageSlider';
import UserProfile from './UserProfile/UserProfile';
import PostHeader from './PostHeader/PostHeader';
import PostContent from './PostContent/PostContent';

const Post = () => {
  return (
    <BackgroundBox>
      <ImageSlider />
      <TextContentWrapper>
        <UserProfile />
        <Seperator margin="1.6rem 0" type="horizon" />
        <PostHeader />
        <Seperator margin="1.8rem 0" type="horizon" />
        <PostContent />
      </TextContentWrapper>
    </BackgroundBox>
  );
};

Post.propTypes = {};

const TextContentWrapper = styled.div`
  padding: 1.2rem;
`;

export default Post;
