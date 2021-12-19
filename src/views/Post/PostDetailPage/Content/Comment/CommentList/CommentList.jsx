import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Avatar } from '@/components/Avatar';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { timeForToday } from '@/utils/helpers';
import useAuth from '@/hooks/useAuth';

const CommentList = ({
  comments,
  onRemove,
  onCompile,
  compileMenuToggles,
  onToggleCompileMenu
}) => {
  const { userId } = useAuth();

  return (
    <Wrapper>
      {comments.map(({ id, content, account, createdAt }, index) => (
        <CommentItem key={id}>
          <Avatar src={account.image} size="3.6rem" margin="0"></Avatar>
          <DetailInformationWrapper>
            <Nickname>{account.nickname}</Nickname>
            <Text dangerouslySetInnerHTML={{ __html: content }} />
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
              <StyledEditIconButton onClick={() => onCompile()}>
                <StyledEditIcon />
              </StyledEditIconButton>
              <StyledRestoreFromTrashIconButton
                onClick={() => {
                  onRemove(id);
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
  margin-left: 1.6rem;
`;

const Nickname = styled.div`
  margin-bottom: 1.2rem;
  font-size: 1.2rem;
  font-weight: bold;
`;

const Text = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  font-size: 1.2rem;
`;

const AdditionalInformation = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;

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

CommentList.propTypes = {
  comments: PropTypes.array,
  onRemove: PropTypes.func,
  onCompile: PropTypes.func,
  onToggleCompileMenu: PropTypes.func,
  compileMenuToggles: PropTypes.array
};

export default CommentList;

const isNotCompileButtonShown = (commentId, userId, content) =>
  commentId !== userId || content === '작성자가 삭제한 댓글입니다.';
