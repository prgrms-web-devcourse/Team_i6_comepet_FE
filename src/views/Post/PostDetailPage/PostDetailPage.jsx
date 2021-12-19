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
  const { data: postData } = useSWR(`/missing-posts/${id}`, GET);
  const { data: commentData } = useSWR(`/missing-posts/${id}/comments`, GET);

  if (!postData || !commentData) return <div></div>;

  return (
    <Wrapper>
      <ShortHeader location="게시글" />
      <TopWrapper>
        <BackgroundBox>
          <Post data={postData} postId={id} />
        </BackgroundBox>
      </TopWrapper>
      <BottomWrapper>
        <BackgroundBox>
          <Comment data={commentData.comments} postId={id} />
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
