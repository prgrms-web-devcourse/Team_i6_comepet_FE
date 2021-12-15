import React from 'react';
import PropTypes from 'prop-types';
import { BackgroundBox } from '@/components/BackgroundBox';
import { Seperator } from '@/components/Seperator';
import CommentHeader from './CommentHeader/CommentHeader';
import CommentList from './CommentList/CommentList';
import CommentCreate from './CommentCreate/CommentCreate';

const Comment = ({ data }) => {
  return (
    <BackgroundBox>
      <CommentHeader commentCount={data.commentCount} />
      <Seperator type="horizon" />
      <CommentList comments={data.comments} createdAt={data.createdAt} />
      <CommentCreate />
    </BackgroundBox>
  );
};

Comment.propTypes = {
  data: PropTypes.object
};

export default Comment;
