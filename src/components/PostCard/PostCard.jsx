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
  postId,
  city,
  town,
  animalKindName,
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
  const switchTextBy = (animalKindName) => {
    switch (animalKindName) {
      case 'UNKNOWN':
        return '종류 모름';
      default:
        return animalKindName;
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
        <ImageWrapper>
          <Image
            src={thumbnail}
            width={width || '14.4rem'}
            height="12.6rem"
            borderRadius="1.6rem 1.6rem 0 0"
          />
          <ScrapCounter size="small" isBookmark={isBookmark}>
            {bookmarkCount}
          </ScrapCounter>
        </ImageWrapper>
        <Content>
          <Title>
            {switchTextBy(animalKindName)}
            <SexIconWrapper>{switchIconBy(sex)}</SexIconWrapper>
          </Title>
          <Area>
            {city} {town}
          </Area>
          <Date>{formatDate(createdAt || foundDate)}</Date>
          {tags && (
            <TagList>
              {tags.map(({ name }, tagIndex) => (
                <TagItem key={`${postId}${tagIndex}`}>#{name} </TagItem>
              ))}
            </TagList>
          )}
        </Content>
      </BackgroundBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-size: 0.8rem;
`;

const ImageWrapper = styled.div`
  position: relative;
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
  width: 13rem;
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
  postId: PropTypes.number,
  city: PropTypes.string,
  town: PropTypes.string,
  animalKindName: PropTypes.string,
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
