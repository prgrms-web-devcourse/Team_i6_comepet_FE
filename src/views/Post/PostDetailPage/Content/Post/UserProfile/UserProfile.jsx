import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Avatar } from '@/components/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import useAuth from '@/hooks/useAuth';
import { changeTimeFormation } from '@/utils/helpers';
import { useNavigate } from 'react-router-dom';

const PostHeader = ({
  account,
  compileMenuToggle,
  viewCount,
  createdAt,
  onToggleCompileMenu,
  onRemove,
  postId
}) => {
  const { userId } = useAuth();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <AvatarWrapper>
        <Avatar src={account.image} margin="0" size="5rem" />
      </AvatarWrapper>
      <InnerWrapper>
        <NicknameAndCompileIconWrapper>
          <Nickname>{account.nickname}</Nickname>
          <CompileWrapper>
            <StyledMoreVertIconButton
              isNotCompileButtonShown={isNotCompileButtonShown(account.id, userId)}
              onClick={onToggleCompileMenu}>
              <StyledMoreVertIcon />
            </StyledMoreVertIconButton>
            <CompileMenuWrapper isNotCompileMenuShown={compileMenuToggle}>
              <StyledEditIconButton onClick={() => navigate(`/post/edit/${postId}`)}>
                <StyledEditIcon />
              </StyledEditIconButton>
              <StyledRestoreFromTrashIconButton onClick={onRemove}>
                <StyledRestoreFromTrashIcon />
              </StyledRestoreFromTrashIconButton>
            </CompileMenuWrapper>
          </CompileWrapper>
        </NicknameAndCompileIconWrapper>
      </InnerWrapper>
      <PostDateWrapper>
        <PostDate>
          {changeTimeFormation(createdAt)} / 조회수 {viewCount}
        </PostDate>
      </PostDateWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  position: relative;
`;

const AvatarWrapper = styled.div`
  width: 5rem;
  height: 5rem;
`;

const InnerWrapper = styled.div`
  margin-left: 1.6rem;
`;

const NicknameAndCompileIconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
`;

const PostDateWrapper = styled.div`
  position: absolute;
  right: 1rem;
  bottom: 0;
`;

const Nickname = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const CompileWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0.8rem;
`;

const StyledMoreVertIconButton = styled.button`
  position: absolute;
  right: 0;
  display: ${({ isNotCompileButtonShown }) => isNotCompileButtonShown && 'none'};
`;

const CompileMenuWrapper = styled.div`
  position: absolute;
  right: 3rem;
  top: 0.2rem;
  display: ${({ isNotCompileMenuShown }) => (isNotCompileMenuShown && 'none') || 'flex'};
`;

const StyledEditIconButton = styled.button`
  display: flex;
  align-items: center;
  border: ${({ theme }) => `0.1rem solid ${theme.colors.lighterGray}`};
  border-radius: 0.8rem;
  background-color: white;
`;

const StyledEditIcon = styled(EditIcon)``;

const StyledRestoreFromTrashIconButton = styled.button`
  display: flex;
  align-items: center;
  margin-left: 0.6rem;
  border: ${({ theme }) => `0.1rem solid ${theme.colors.lighterGray}`};
  border-radius: 0.8rem;
  background-color: white;
`;

const StyledRestoreFromTrashIcon = styled(RestoreFromTrashIcon)``;

const PostDate = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.normalGray};
`;

const StyledMoreVertIcon = styled(MoreVertIcon)`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.brand};

  :hover {
    color: red;
  }
`;

PostHeader.propTypes = {
  account: PropTypes.object,
  viewCount: PropTypes.number,
  createdAt: PropTypes.string,
  onToggleCompileMenu: PropTypes.func,
  compileMenuToggle: PropTypes.bool,
  onRemove: PropTypes.func,
  postId: PropTypes.string
};

export default PostHeader;

const isNotCompileButtonShown = (commentId, userId) => {
  return commentId !== userId;
};
