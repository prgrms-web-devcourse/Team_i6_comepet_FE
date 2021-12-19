import React from 'react';
import styled from '@emotion/styled';
import { useParams } from 'react-router';
import { BackgroundBox } from '@/components/BackgroundBox';
import { ShortHeader } from '@/components/Header';
import { Post, Comment } from './Content';
import useSWR from 'swr';
import { GET } from '@/apis/axios';

const PostDetailPage = () => {
  const { id } = useParams();
  const { data: res } = useSWR(`/missing-posts/${id}`, GET);
  if (!res) return <div></div>;

  return (
    <Wrapper>
      <ShortHeader location="글 작성" />
      <TopWrapper>
        <BackgroundBox>
          <Post data={res} />
        </BackgroundBox>
      </TopWrapper>
      <BottomWrapper>
        <BackgroundBox>
          <Comment data={res} />
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

PostDetailPage.propTypes = {};

export default PostDetailPage;
