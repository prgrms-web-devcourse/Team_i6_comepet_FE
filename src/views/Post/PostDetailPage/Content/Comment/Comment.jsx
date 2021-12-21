import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BackgroundBox } from '@/components/BackgroundBox';
import { Seperator } from '@/components/Seperator';
import CommentHeader from './CommentHeader/CommentHeader';
import CommentList from './CommentList/CommentList';
import CommentCreate from './CommentCreate/CommentCreate';
import { POST, DELETE, PATCH } from '@/apis/axios';

const Comment = ({ data, postId }) => {
  const [comments, setComments] = useState([...data]);
  const [commentCount, setCommentCount] = useState(comments.length);
  const [compileMenuToggles, setCompileMenuToggles] = useState(
    new Array(comments.length).fill(true)
  );
  // TODO: compileMenu 도 추후에 false로 통일시킬 것
  const [compileEditorToggles, setCompileEditorToggles] = useState(
    new Array(comments.length).fill(false)
  );

  const handleCreateComment = async (content) => {
    const res = await POST('/comments', {
      postId,
      content
    });

    const nextComment = [...comments];
    nextComment.push(res);
    setComments(nextComment);
  };

  const handleAddCompileMenuToggle = () => {
    const nextCompileMenuToggles = [...compileMenuToggles];
    nextCompileMenuToggles.push(true);
    setCompileMenuToggles(nextCompileMenuToggles);
  };

  const handleAddCompileEditorToggle = () => {
    const nextCompileEditorToggles = [...compileEditorToggles];
    nextCompileEditorToggles.push(false);
    setCompileEditorToggles(nextCompileEditorToggles);
  };

  const handleToggleCompileMenu = (index) => {
    const nextState = [...compileMenuToggles];
    const buttonIndexToToggle = nextState.findIndex((_, targetIndex) => targetIndex === index);
    nextState[buttonIndexToToggle] = !nextState[buttonIndexToToggle];
    setCompileMenuToggles(nextState);
  };

  const handleToggleCompileEditor = (index) => {
    const nextState = [...compileEditorToggles];
    const compilingCommentIndex = nextState.findIndex((isCompiling) => isCompiling);
    const indexToEdit = nextState.findIndex((_, targetIndex) => targetIndex === index);

    if (compilingCommentIndex !== indexToEdit) {
      nextState[compilingCommentIndex] = false;
      handleToggleCompileMenu(compilingCommentIndex);
    }

    nextState[indexToEdit] = !nextState[indexToEdit];
    setCompileEditorToggles(nextState);
  };

  const handleRemoveComment = async (commentId) => {
    await DELETE(`/comments/${commentId}`);
    const nextState = [...comments];
    const indexToDelete = comments.findIndex(({ id }) => id === commentId);
    const indexToDeleteObject = nextState[indexToDelete];
    const nextObject = { ...indexToDeleteObject };
    nextObject.content = '작성자가 삭제한 댓글입니다.';
    nextState[indexToDelete] = nextObject;
    setComments(nextState);
  };

  const handleCompileComment = async (content, commentId) => {
    const compiledComment = await PATCH(`/comments/${commentId}`, {
      content
    });

    const nextState = [...comments];
    const targetCommentIndex = nextState.findIndex(({ id }) => id === commentId);
    nextState[targetCommentIndex] = compiledComment;

    setComments(nextState);
  };

  const handleIncreaseCommentCount = () => {
    setCommentCount(commentCount + 1);
  };

  return (
    <BackgroundBox>
      <CommentHeader commentCount={commentCount} />
      <Seperator type="horizon" />
      <CommentList
        comments={comments}
        compileMenuToggles={compileMenuToggles}
        compileEditorToggles={compileEditorToggles}
        onRemoveComment={(id) => {
          handleRemoveComment(id);
        }}
        onCompileComment={(input, index) => {
          handleCompileComment(input, index);
          handleToggleCompileEditor();
        }}
        onToggleCompileMenu={handleToggleCompileMenu}
        onToggleCompileEditor={handleToggleCompileEditor}
      />
      <CommentCreate
        onChange={(input) => {
          handleCreateComment(input);
          handleIncreaseCommentCount();
          handleAddCompileMenuToggle();
          handleAddCompileEditorToggle();
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
