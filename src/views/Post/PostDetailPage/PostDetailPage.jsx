import React from 'react';
import styled from '@emotion/styled';
import { BackgroundBox } from '@/components/BackgroundBox';
import { ShortHeader } from '@/components/Header';
import { Post, Comment } from './Content';

const PostCreatePage = () => {
  const res = {
    id: 13,
    user: {
      id: 45,
      nickname: '짱구',
      image: 'http://../../97fd3403-7343-497a-82fa-c41d26ccf0f8.png'
    },
    status: 'DETECTION',
    date: '2021-11-01',
    city: '경기도',
    town: '구리시',
    detailAddress: '주민센터 앞 골목 근처',
    telNumber: '01077320920',
    animal: '개',
    animalKindName: '리트리버 초 울트라 하이퍼 강아지입니다 아마도르마무',
    age: 10,
    sex: 'FEMALE',
    chipNumber: '410123456789112',
    postImages: [
      {
        name: 'http://../../97fd3403-7343-497a-82fa-c41d26ccf0f8.png'
      }
    ],
    postTags: [
      {
        id: 1,
        name: '고슴도치요'
      },
      {
        id: 2,
        name: '고슴도치요'
      },
      {
        id: 3,
        name: '고슴도치요'
      },
      {
        id: 4,
        name: '고슴도치요'
      },
      {
        id: 5,
        name: '고슴도치요'
      },
      {
        id: 6,
        name: '최대글자수'
      }
    ],
    content: '찾아주시면 반드시 사례하겠습니다. 연락주세요',
    viewCount: 0,
    bookmarkCount: 5,
    isBookmark: false,
    commentCount: 23,
    comments: [
      {
        id: 1,
        content:
          '얼른 찾으시길 바래요 ㅠ 근데 글자가 길어지면 어떻게 되는지 알려주실 수 있으신가요?',
        createdAt: '2021-11-05T16:55:37.436056',
        user: {
          id: 45,
          nickname: '짱구는최대글자수에요',
          image: 'http://../../97fd3403-7343-497a-82fa-c41d26ccf0f8.png'
        }
      }
    ],
    createdAt: '2021-11-05T16:55:37.436056'
  };

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

PostCreatePage.propTypes = {};

export default PostCreatePage;
