import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { BackgroundBox } from '@/components/BackgroundBox';
import { Image } from '@/components/Image';
import { ScrapCounter } from '@/components/ScrapCounter';
import { StatusTag } from '@/components/StatusTag';
import { formatDate } from '@/utils/helpers';
import MaleRoundedIcon from '@mui/icons-material/MaleRounded';
import FemaleRoundedIcon from '@mui/icons-material/FemaleRounded';
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';

const PostCard = ({
  city,
  town,
  animalKind,
  status,
  createdAt,
  sex,
  isBookmark,
  bookmarkCount,
  tags,
  thumbnail,
  foundDate,
  width,
  height
}) => {
  const switchTextBy = (animalKind) => {
    switch (animalKind) {
      case 'UNKNOWN':
        return '종류 모름';
      default:
        return animalKind;
    }
  };

  const switchIconBy = (sex) => {
    switch (sex) {
      case 'MALE':
        return <MaleRoundedIcon />;
      case 'FEMALE':
        return <FemaleRoundedIcon />;
      case 'UNKNOWN':
        return <QuestionMarkRoundedIcon />;
    }
  };

  return (
    <Wrapper>
      <BackgroundBox width={width || '14.4rem'} height={height || '21.1rem'}>
        {status && <StatusTag status={status} />}
        <Image
          src={thumbnail}
          width={width || '14.4rem'}
          height="12.6rem"
          borderRadius="1.6rem 1.6rem 0 0"
        />
        <ScrapCounter size="small" isBookmark={isBookmark}>
          {bookmarkCount}
        </ScrapCounter>
        <Content>
          <Title>
            {switchTextBy(animalKind)}
            <SexIconWrapper>{switchIconBy(sex)}</SexIconWrapper>
          </Title>
          <Area>
            {city} {town}
          </Area>
          {tags && (
            <TagList>
              {tags.map(({ id, name }) => (
                <TagItem key={id}>#{name} </TagItem>
              ))}
            </TagList>
          )}
          <Date>{formatDate(createdAt || foundDate)}</Date>
        </Content>
      </BackgroundBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-size: 0.8rem;
`;

const Content = styled.div`
  padding: 0.4rem 0.8rem;
`;

const Title = styled.div`
  margin-bottom: 0.4rem;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

const SexIconWrapper = styled.div`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.normalGreen};
`;

const Area = styled.div`
  margin-bottom: 0.4rem;
`;

const TagList = styled.ul`
  margin-bottom: 0.4rem;
  color: ${({ theme }) => theme.colors.normalGray};
`;

const TagItem = styled.li`
  display: inline;
`;

const Date = styled.div`
  margin-bottom: 0.4rem;
`;

PostCard.propTypes = {
  city: PropTypes.string,
  town: PropTypes.string,
  animalKind: PropTypes.string,
  status: PropTypes.string,
  createdAt: PropTypes.string,
  foundDate: PropTypes.string,
  sex: PropTypes.string,
  isBookmark: PropTypes.bool,
  bookmarkCount: PropTypes.number,
  tags: PropTypes.array,
  thumbnail: PropTypes.string,
  shelterPlace: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
};

export default PostCard;
