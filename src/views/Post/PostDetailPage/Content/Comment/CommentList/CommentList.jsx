import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Avatar } from '@/components/Avatar';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { timeForToday } from '@/utils/helpers';

const CommentList = ({ comments, createdAt }) => {
  // const [commentVisibility, setCommentVisibility] = useState(makeCommentVisibilities(comments));

  // const handleCompileMenuVisibility = (e) => {};

  return (
    <Wrapper>
      {comments.map(({ id, content, user }) => (
        <CommentItem key={id}>
          <Avatar src={user.image} size="3.6rem" margin="0"></Avatar>
          <DetailInformationWrapper>
            <Nickname>{user.nickname}</Nickname>
            <Text>{content}</Text>
          </DetailInformationWrapper>
          <AdditionalInformation>
            <DateWrapper>
              <Date>{timeForToday(createdAt)}</Date>
              <CompileButton>
                <StyledMoreHorizIcon></StyledMoreHorizIcon>
              </CompileButton>
            </DateWrapper>
            <CompileMenuWrapper>
              <StyledEditIconButton>
                <StyledEditIcon />
              </StyledEditIconButton>
              <StyledRestoreFromTrashIconButton>
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
  font-size: 1.2rem;
`;

const AdditionalInformation = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Date = styled.div``;

const CompileButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0 0.6rem;
  :hover {
    color: red;
  }
`;

const StyledMoreHorizIcon = styled(MoreHorizIcon)``;

const CompileMenuWrapper = styled.div`
  display: flex;
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
  createdAt: PropTypes.string
};

export default CommentList;

// const makeCommentVisibilities = (comments) => comments.map(({ id }) => ({ id, isVisible: false }));
