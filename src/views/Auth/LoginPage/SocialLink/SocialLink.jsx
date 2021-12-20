import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { getImageSrc } from '@/utils/helpers';
import { Image } from '@/components/Image';
import { DEV_ERROR } from '@/utils/constants';

const SocialLink = ({ type }) => {
  const imageSrc = getImageUrl(type);
  const bgColor = getBgColor(type);
  const linkUrl = getLinkUrl(type);

  return (
    <Link href={linkUrl} bgColor={bgColor} type={type}>
      <Image src={imageSrc} alt={type} width="auto" height="1.8rem" />
    </Link>
  );
};

const Link = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: ${({ bgColor }) => bgColor};
  border: ${({ type, theme }) => type === 'google' && `0.1rem solid ${theme.colors.lighterGray}`};
  margin: 0 4%;
`;

SocialLink.propTypes = {
  type: PropTypes.string
};

export default SocialLink;

const getImageUrl = (type) => {
  let url = '';

  switch (type) {
    case 'google':
      url = '/images/social-logo-google.svg';
      break;
    case 'kakao':
      url = '/images/social-logo-kakao.svg';
      break;
    case 'naver':
      url = '/images/social-logo-naver.svg';
      break;
    default:
      console.error(DEV_ERROR.INVALID_PROP);
  }

  return getImageSrc(url);
};

const getBgColor = (type) => {
  let bgColor = '';

  switch (type) {
    case 'google':
      bgColor = '#f8f8f8';
      break;
    case 'kakao':
      bgColor = '#fdec03';
      break;
    case 'naver':
      bgColor = '#30c739';
      break;
    default:
      console.error(DEV_ERROR.INVALID_PROP);
  }

  return getImageSrc(bgColor);
};

const getLinkUrl = (type) => {
  switch (type) {
    case 'google':
      return process.env.REACT_APP_GOOGLE_URL;
    case 'naver':
      return process.env.REACT_APP_NAVER_URL;
  }
};
