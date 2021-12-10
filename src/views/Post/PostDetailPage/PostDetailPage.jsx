import React from 'react';
import styled from '@emotion/styled';
import { BackgroundBox } from '@/components/BackgroundBox';
import { ShortHeader } from '@/components/Header';
import { Post, Comment } from './Content';

const PostCreatePage = () => {
  return (
    <Wrapper>
      <ShortHeader location="글 작성" />
      <TopWrapper>
        <BackgroundBox>
          <Post />
        </BackgroundBox>
      </TopWrapper>
      <BottomWrapper>
        <BackgroundBox>
          <Comment />
        </BackgroundBox>
      </BottomWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 8rem 2.4rem 2.4rem 2.4rem;
`;

const TopWrapper = styled.div`
  margin-bottom: 2.4rem;
`;

const BottomWrapper = styled.div``;

PostCreatePage.propTypes = {};

export default PostCreatePage;
