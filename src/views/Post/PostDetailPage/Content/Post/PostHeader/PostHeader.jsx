import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

const PostHeader = ({ animal, animalKindName, sex, tags }) => {
  return (
    <Wrapper>
      <AnimalWrapper>
        <Animal>{animal}/</Animal>
        <Kinds>{(animalKindName === 'UNKNOWN' && '모름') || animalKindName}</Kinds>
        {(sex === 'MALE' && <StyledMaleIcon />) ||
          (sex === 'FEMALE' && <StyledFemaleIcon />) ||
          (sex === 'UNKNOWN' && <StyledQuestionMarkIcon />)}
      </AnimalWrapper>
      <HashTagWrapper>
        {tags.map(({ id, name }) => (
          <HashTag key={id}>#{name} </HashTag>
        ))}
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledMaleIcon = styled(MaleIcon)`
  margin-bottom: 0.3rem;
  font-size: 2.4rem;
  color: ${({ theme }) => theme.colors.normalGreen};
`;

const StyledFemaleIcon = styled(FemaleIcon)`
  margin-bottom: 0.3rem;
  font-size: 2.6rem;
  color: ${({ theme }) => theme.colors.normalGreen};
`;

const StyledQuestionMarkIcon = styled(QuestionMarkIcon)`
  font-size: 2.2rem;
  margin-bottom: 0.3rem;
  color: ${({ theme }) => theme.colors.normalGreen};
`;

const HashTagWrapper = styled.div``;

const HashTag = styled.span`
  margin-top: 0.5rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.normalBlack};
`;

PostHeader.propTypes = {
  animal: PropTypes.string,
  animalKindName: PropTypes.string,
  sex: PropTypes.string,
  tags: PropTypes.array
};

export default PostHeader;
