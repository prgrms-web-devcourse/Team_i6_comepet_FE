import React from 'react';
import styled from '@emotion/styled';
import { getImageSrc } from '@/utils/helpers';
import { ShortHeader } from '@/components/Header';

const NotFoundPage = () => {
  return (
    <Wrapper>
      <ShortHeader location="404Page" />
      <Img src={getImageSrc('/images/404page.svg')} alt="페이지를 찾을 수 없습니다" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  margin: 0 auto;
  padding: 8rem 2.4rem 2.4rem 2.4rem;
  text-align: center;
`;

const Img = styled.img`
  width: 60%;
  height: 60%;
`;

export default NotFoundPage;
