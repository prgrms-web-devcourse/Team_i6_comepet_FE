import React from 'react';
import styled from '@emotion/styled';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

const PostHeader = () => {
  const GENDER = 'Female';
  return (
    <Wrapper>
      <AnimalWrapper>
        <Animal>강아지/</Animal>
        <Kinds>골든리트리버</Kinds>
        {(GENDER === 'Male' && <StyledMaleIcon />) || (GENDER === 'Female' && <StyledFemaleIcon />)}
      </AnimalWrapper>
      <HashTagWrapper>
        <HashTag>#최대글자수 </HashTag>
        <HashTag>#최대글자수 </HashTag>
        <HashTag>#최대글자수 </HashTag>
        <HashTag>#최대글자수 </HashTag>
        <HashTag>#최대글자수 </HashTag>
        <HashTag>#최대글자수</HashTag>
      </HashTagWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const AnimalWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 0.8rem;
`;

const Animal = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
`;

const Kinds = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
`;

const StyledMaleIcon = styled(MaleIcon)`
  font-size: 2.4rem;
  color: ${({ theme }) => theme.colors.normalGreen};
`;

const StyledFemaleIcon = styled(FemaleIcon)`
  font-size: 2.6rem;
  color: ${({ theme }) => theme.colors.normalGreen};
`;

const HashTagWrapper = styled.div``;

const HashTag = styled.span`
  margin-top: 0.5rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.normalBlack};
`;

PostHeader.propTypes = {};

export default PostHeader;
