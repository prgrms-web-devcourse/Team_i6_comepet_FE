import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Avatar } from '@/components/Avatar';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { timeForToday } from '@/utils/helpers';
import useAuth from '@/hooks/useAuth';

const CommentList = ({
  comments,
  onRemoveComment,
  onCompileComment,
  compileMenuToggles,
  compileEditorToggles,
  onToggleCompileEditor,
  onToggleCompileMenu
}) => {
  const [input, setInput] = useState('');

  const { userId } = useAuth();

  const handleInput = async (e) => {
    const textWithTags = e.target.innerHTML;
    setInput(textWithTags);
  };

  const handleKeyDown = (e) => {
    if (e.target.textContent.length >= 255 && e.key !== 'Backspace') {
      e.preventDefault();
      return;
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
  };

  // TODO: CompileEditor에 ContentEditor 컴포넌트 이용하기
  return (
    <Wrapper>
      {comments.map(({ id, content, account, createdAt }, index) => (
        <CommentItem key={id}>
          <Avatar src={account.image} size="3.6rem" margin="0" />
          <DetailInformationWrapper>
            <Nickname>{account.nickname}</Nickname>
            {(!isCompiling(compileEditorToggles, index) && (
              <Text dangerouslySetInnerHTML={{ __html: content }} />
            )) ||
              (isCompiling(compileEditorToggles, index) && (
                <CommentEditorWrapper>
                  <CommentEditor
                    contentEditable
                    dangerouslySetInnerHTML={{ __html: content }}
                    onKeyDown={handleKeyDown}
                    onInput={handleInput}
                    onPaste={handlePaste}
                  />
                  <CompiledCommentSubmitButton
                    onClick={() => onCompileComment(input.length !== 0 ? input : content, id)}>
                    <StyledArrowCircleRightIcon />
                  </CompiledCommentSubmitButton>
                </CommentEditorWrapper>
              ))}
          </DetailInformationWrapper>
          <AdditionalInformation>
            <DateWrapper>
              <Date>{timeForToday(createdAt)}</Date>
              <CompileButton
                isNotCompileButtonShown={isNotCompileButtonShown(account.id, userId, content)}
                onClick={() => onToggleCompileMenu(index)}>
                <StyledMoreHorizIcon />
              </CompileButton>
            </DateWrapper>
            <CompileMenuWrapper isNotCompileMenuShown={compileMenuToggles[index]}>
              <StyledEditIconButton onClick={() => onToggleCompileEditor(index)}>
                <StyledEditIcon />
              </StyledEditIconButton>
              <StyledRestoreFromTrashIconButton
                onClick={() => {
                  onRemoveComment(id);
                  onToggleCompileMenu(index);
                }}>
                <StyledRestoreFromTrashIcon />
              </StyledRestoreFromTrashIconButton>
            </CompileMenuWrapper>
          </AdditionalInformation>
        </CommentItem>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  padding: 1.6rem 1.6rem 0 1.6rem;
`;

const CommentItem = styled.li`
  position: relative;
  display: flex;
  margin-bottom: 2rem;
`;

const DetailInformationWrapper = styled.div`
  flex-grow: 1;
  margin-left: 1.6rem;
`;

const Nickname = styled.div`
  margin-bottom: 1.2rem;
  font-size: 1.2rem;
  font-weight: bold;
`;

const CommentEditorWrapper = styled.div`
  position: relative;
`;

const CommentEditor = styled.div`
  background-color: ${({ theme }) => theme.colors.lighterBlue};
  width: 100%;
  border-radius: 0.6rem;
  padding: 2rem;
  font-size: 1.2rem;
  outline: none;
`;

const CompiledCommentSubmitButton = styled.button`
  position: absolute;
  z-index: 1;
  right: 0.1rem;
  bottom: 0;
`;

const Text = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  font-size: 1.2rem;
`;

const AdditionalInformation = styled.div``;

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Date = styled.div``;

const CompileButton = styled.button`
  display: ${({ isNotCompileButtonShown }) => (isNotCompileButtonShown && 'none') || 'flex'};
  align-items: center;
  padding: 0 0.6rem;
  :hover {
    color: red;
  }
`;

const StyledMoreHorizIcon = styled(MoreHorizIcon)``;

const CompileMenuWrapper = styled.div`
  display: ${({ isNotCompileMenuShown }) => (isNotCompileMenuShown && 'none') || 'flex'};
  position: absolute;
  right: 0.1rem;
`;

const StyledEditIconButton = styled.button`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.normalWhite};
  border: ${({ theme }) => `0.1rem solid ${theme.colors.lighterGray}`};
  border-radius: 0.8rem;
`;
const StyledEditIcon = styled(EditIcon)``;
const StyledRestoreFromTrashIconButton = styled.button`
  display: flex;
  align-items: center;
  margin-left: 0.6rem;
  border: ${({ theme }) => `0.1rem solid ${theme.colors.lighterGray}`};
  border-radius: 0.8rem;
`;
const StyledRestoreFromTrashIcon = styled(RestoreFromTrashIcon)``;

const StyledArrowCircleRightIcon = styled(ArrowCircleRightIcon)`
  font-size: 4.5rem;
  transform: rotate(-90deg);
  color: ${({ theme }) => theme.colors.normalOrange};
`;

CommentList.propTypes = {
  comments: PropTypes.array,
  onRemoveComment: PropTypes.func,
  onCompileComment: PropTypes.func,
  onToggleCompileMenu: PropTypes.func,
  compileMenuToggles: PropTypes.array,
  compileEditorToggles: PropTypes.array,
  onToggleCompileEditor: PropTypes.func
};

export default CommentList;

const isNotCompileButtonShown = (commentId, userId, content) =>
  commentId !== userId || content === '작성자가 삭제한 댓글입니다.';

const isCompiling = (compileEditorToggles, index) => compileEditorToggles[index] === true;
