import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Avatar } from '@/components/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { changeTimeFormation } from '@/utils/helpers';

const PostHeader = ({ user, viewCount, createdAt }) => {
  return (
    <Wrapper>
      <Avatar src={user.image} margin="0" size="5rem" />
      <InnerWrapper>
        <NicknameAndCompileIconWrapper>
          <Nickname>{user.nickname}</Nickname>
          <CompileWrapper>
            <StyledMoreVertIconButton>
              <StyledMoreVertIcon />
            </StyledMoreVertIconButton>
            <CompileMenuWrapper>
              <StyledEditIconButton>
                <StyledEditIcon />
              </StyledEditIconButton>
              <StyledRestoreFromTrashIconButton>
                <StyledRestoreFromTrashIcon />
              </StyledRestoreFromTrashIconButton>
            </CompileMenuWrapper>
          </CompileWrapper>
        </NicknameAndCompileIconWrapper>
        <PostDateWrapper>
          <PostDate>
            {changeTimeFormation(createdAt)} / 조회수 {viewCount}
          </PostDate>
        </PostDateWrapper>
      </InnerWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 1rem;
`;

const InnerWrapper = styled.div`
  flex-grow: 1;
  margin-left: 1.6rem;
`;

const NicknameAndCompileIconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
`;

const PostDateWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Nickname = styled.div`
  flex-grow: 1;
  font-size: 1.8rem;
  font-weight: bold;
`;

const CompileWrapper = styled.div`
  position: relative;
`;

const StyledMoreVertIconButton = styled.button``;

const CompileMenuWrapper = styled.div`
  display: flex;
  position: absolute;
  right: 0;
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
  user: PropTypes.object,
  viewCount: PropTypes.number,
  createdAt: PropTypes.string
};

export default PostHeader;
