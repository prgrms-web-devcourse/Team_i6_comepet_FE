/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import useSWRInfinite from 'swr/infinite';
import { useInView } from 'react-intersection-observer';
import { LongHeader } from '@/components/Header';
import { SortHeader } from '@/views/Main/SortHeader';
import { PostCard } from '@/components/PostCard';

import { GET } from '@/apis/axios';
import useSWR from 'swr';
import useAuth from '@/hooks/useAuth';
import { throttle } from '@/utils/helpers';
import _CircularProgress from '@mui/material/CircularProgress';

const MainPage = () => {
  const { isLoggedIn } = useAuth();
  const [filterConditions, setFilterConditions] = useState({});
  const { data: likeArea } = isLoggedIn && useSWR('/me/areas', GET);
  const userLikeCity = likeArea && likeArea.areas.length > 0 && likeArea.areas[0].cityName;
  const userLikeTown = likeArea && likeArea.areas.length > 0 && likeArea.areas[0].townName;
  const userLikeArea =
    (isNotFilterConditionApplied(filterConditions) && getUserLikeArea(likeArea)) || '';
  const handleSetFilterCondition = (filterConditionObject) => {
    filterConditionObject.start && setSortingOrder('ASC');
    setFilterConditions(filterConditionObject);
  };

  const [target, isTargetInView] = useInView();
  const [sortingOrder, setSortingOrder] = useState('DESC');
  const { data, size, setSize } = useSWRInfinite(
    (index) =>
      `/missing-posts?page=${index}&size=12&sort=id%2C${sortingOrder}` +
      makeFilterConditionUrl(filterConditions) +
      userLikeArea,
    GET
  );
  const posts = data?.reduce((prevData, nextData) => {
    return { missingPosts: [...prevData.missingPosts, ...nextData.missingPosts] };
  }).missingPosts;
  const isReachingEnd = data && data[data?.length - 1]?.last;
  const postLength = (data && data[0]?.totalElements) || 0;

  useEffect(() => {
    if (!isReachingEnd && isTargetInView) {
      throttle(() => setSize(size + 1), 500)();
    }
  }, [isTargetInView]);

  return (
    <Wrapper>
      <LongHeader onSearch={handleSetFilterCondition} />
      <ContentWrapper>
        <SortHeader
          postLength={postLength}
          sortingOrder={sortingOrder}
          setSortingOrder={setSortingOrder}
          filterConditions={filterConditions}
          userLikeCity={userLikeCity}
          userLikeTown={userLikeTown}
        />
        <PostCardListWrapper>
          {(postLength && (
            <PostCardList>
              {posts.map(({ id, ...props }) => (
                <PostCardWrapper key={id}>
                  <Link to={`/post/${id}`}>
                    <PostCard postId={id} {...props} />
                  </Link>
                </PostCardWrapper>
              ))}
            </PostCardList>
          )) || <NoResultText>검색 결과가 없습니다.</NoResultText>}
        </PostCardListWrapper>
        <SpinnerWrapper>{!isReachingEnd && <CircularProgress ref={target} />}</SpinnerWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0 auto;
`;

const ContentWrapper = styled.div`
  position: relative;
  padding: 17rem 2.4rem 2.4rem 2.4rem;
`;

const PostCardListWrapper = styled.div`
  position: relative;
`;

const PostCardList = styled.ul`
  max-width: 73.4rem;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  justify-content: center;
`;

const PostCardWrapper = styled.li`
  justify-self: center;
`;

const NoResultText = styled.div`
  padding: 12rem 4rem;
  font-size: 1.6rem;
  font-weight: bold;
  text-align: center;
  color: ${({ theme }) => theme.colors.normalGray};
`;

const SpinnerWrapper = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%);
`;

const CircularProgress = styled(_CircularProgress)`
  color: ${({ theme }) => theme.colors.normalOrange};
`;

export default MainPage;

const makeFilterConditionUrl = (conditionObject) => {
  let res = '';

  for (const [key, value] of Object.entries(conditionObject)) {
    if (
      value &&
      key !== 'cityName' &&
      key !== 'townName' &&
      key !== 'animalString' &&
      key !== 'animalKindName'
    )
      res += `&${key}=${value}`;
  }

  res += '&sort=id%2CASC';

  return res;
};

const isNotFilterConditionApplied = (filterConditionObject) =>
  filterConditionObject && !Object.values(filterConditionObject).some((boolean) => boolean);

const getUserLikeArea = (likeArea) =>
  likeArea &&
  likeArea.areas.length > 0 &&
  `&city=${likeArea.areas[0].cityId}&town=${likeArea.areas[0].townId}`;
