import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BackgroundBox } from '@/components/BackgroundBox';
import { Seperator } from '@/components/Seperator';
import ImageSlider from './ImageSlider/ImageSlider';
import UserProfile from './UserProfile/UserProfile';
import PostHeader from './PostHeader/PostHeader';
import PostContent from './PostContent/PostContent';
import { POST, DELETE } from '@/apis/axios';
import useAuth from '@/hooks/useAuth';

const Post = ({ data, postId }) => {
  const [compileMenuToggle, setCompileMenuToggle] = useState(true);
  const [bookmarkCount, setBookmarkCount] = useState(data.bookmarkCount);
  const [isBookmark, setIsBookmark] = useState(data.isBookmark);
  const { isLoggedIn } = useAuth();

  const navigate = useNavigate();

  const handleRemovePost = async () => {
    await DELETE(`/missing-posts/${postId}`);

    navigate('/', { replace: true });
  };

  const handleToggleBookmark = async () => {
    setIsBookmark(!isBookmark);
    !isBookmark && (await POST(`/missing-posts/${postId}/bookmark`));
    isBookmark && (await DELETE(`/missing-posts/${postId}/bookmark`));
  };

  const handleCountBookmark = () => {
    !isBookmark && setBookmarkCount(bookmarkCount + 1);
    isBookmark && setBookmarkCount(bookmarkCount - 1);
  };

  return (
    <BackgroundBox>
      <ImageSlider
        onClickBookmark={() => {
          if (!isLoggedIn) {
            navigate('/login');
            return;
          }
          handleToggleBookmark();
          handleCountBookmark();
        }}
        bookmarkCount={bookmarkCount}
        isBookmark={isBookmark}
        status={data.status}
        images={data.images}
      />
      <TextContentWrapper>
        <UserProfile
          account={data.account}
          viewCount={data.viewCount}
          createdAt={data.createdAt}
          compileMenuToggle={compileMenuToggle}
          onToggleCompileMenu={() => setCompileMenuToggle(!compileMenuToggle)}
          onRemove={handleRemovePost}
          postId={postId}
        />
        <Seperator margin="1.6rem 0" type="horizon" />
        <PostHeader
          animal={data.animal}
          animalKindName={data.animalKindName}
          sex={data.sex}
          tags={data.tags}
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
  data: PropTypes.object,
  postId: PropTypes.string
};

const TextContentWrapper = styled.div`
  padding: 1.2rem;
`;
4;

export default Post;
