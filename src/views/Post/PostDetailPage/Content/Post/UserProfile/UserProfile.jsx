import React from 'react';
import styled from '@emotion/styled';
import { Avatar } from '@/components/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const PostHeader = () => {
  return (
    <Wrapper>
      <Avatar src="" margin="0" size="5rem" />
      <InnerWrapper>
        <NicknameAndCompileIconWrapper>
          <Nickname>닉네임최대글자수맞춤</Nickname>
          <StyledMoreVertIcon />
        </NicknameAndCompileIconWrapper>
        <PostDateWrapper>
          <PostDate>2021년 11월 30일 / 조회수 200</PostDate>
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

PostHeader.propTypes = {};

export default PostHeader;
