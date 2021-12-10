import React from 'react';
import styled from '@emotion/styled';
import { Avatar } from '@/components/Avatar';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const CommentList = () => {
  return (
    <Wrapper>
      <CommentItem>
        <Avatar src="" size="3.6rem" margin="0"></Avatar>
        <DetailInformationWrapper>
          <Nickname>글자수가최대인경우임</Nickname>
          <Text>나 어제 당산역 뒷골목에서 이 강아지봄!</Text>
        </DetailInformationWrapper>
        <AdditionalInformation>
          <CommentDate>어제</CommentDate>
          <CompileButton>
            <StyledMoreHorizIcon></StyledMoreHorizIcon>
          </CompileButton>
        </AdditionalInformation>
      </CommentItem>
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
`;

const CommentDate = styled.div``;

const CompileButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0 0.6rem;
  :hover {
    color: red;
  }
`;

const StyledMoreHorizIcon = styled(MoreHorizIcon)``;

CommentList.propTypes = {};

export default CommentList;
