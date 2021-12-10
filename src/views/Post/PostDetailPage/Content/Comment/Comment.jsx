import React from 'react';
import { BackgroundBox } from '@/components/BackgroundBox';
import { Seperator } from '@/components/Seperator';
import CommentHeader from './CommentHeader/CommentHeader';
import CommentList from './CommentList/CommentList';
import CommentCreate from './CommentCreate/CommentCreate';

const Comment = () => {
  return (
    <BackgroundBox>
      <CommentHeader />
      <Seperator type="horizon" />
      <CommentList />
      <CommentCreate />
    </BackgroundBox>
  );
};

Comment.propTypes = {};

export default Comment;
