import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BackgroundBox } from '@/components/BackgroundBox';
import { Seperator } from '@/components/Seperator';
import CommentHeader from './CommentHeader/CommentHeader';
import CommentList from './CommentList/CommentList';
import CommentCreate from './CommentCreate/CommentCreate';
import { POST, DELETE } from '@/apis/axios';

const Comment = ({ data, postId }) => {
  const [comments, setComments] = useState([...data]);
  const [commentCount, setCommentCount] = useState(comments.length);
  const [compileMenuToggles, setCompileMenuToggles] = useState(
    new Array(comments.length).fill(true)
  );

  const handleCreateComment = async (content) => {
    const res = await POST('/comments', {
      postId,
      content
    });

    const nextComment = [...comments];
    nextComment.push(res);
    setComments(nextComment);

    const nextCompileMenuToggles = [...compileMenuToggles];
    nextCompileMenuToggles.push(true);
    setCompileMenuToggles(nextCompileMenuToggles);
  };

  const handleToggleCompileMenu = (index) => {
    const nextState = [...compileMenuToggles];
    const buttonIndexToToggle = nextState.findIndex((_, targetIndex) => targetIndex === index);
    nextState[buttonIndexToToggle] = !nextState[buttonIndexToToggle];
    setCompileMenuToggles(nextState);
  };

  const handleRemoveComment = async (commentId) => {
    await DELETE('/comments/' + commentId);
    const nextState = [...comments];
    const indexToDelete = comments.findIndex(({ id }) => id === commentId);
    const indexToDeleteObject = nextState[indexToDelete];
    const nextObject = { ...indexToDeleteObject };
    nextObject.content = '작성자가 삭제한 댓글입니다.';
    nextState[indexToDelete] = nextObject;
    setComments(nextState);
  };

  const handleCompileComment = (comment) => {
    console.log(comment);
  };

  const handleIncreaseCommentCount = () => {
    setCommentCount(commentCount + 1);
  };

  const handleDecreaseCommentCount = () => {
    setCommentCount(commentCount - 1);
  };

  return (
    <BackgroundBox>
      <CommentHeader commentCount={commentCount} />
      <Seperator type="horizon" />
      <CommentList
        comments={comments}
        compileMenuToggles={compileMenuToggles}
        onRemove={(id) => {
          handleRemoveComment(id);
          handleDecreaseCommentCount();
        }}
        onCompile={handleCompileComment}
        onToggleCompileMenu={handleToggleCompileMenu}
      />
      <CommentCreate
        onChange={(input) => {
          handleCreateComment(input);
          handleIncreaseCommentCount();
        }}
      />
    </BackgroundBox>
  );
};

Comment.propTypes = {
  data: PropTypes.array,
  postId: PropTypes.string
};

export default Comment;
