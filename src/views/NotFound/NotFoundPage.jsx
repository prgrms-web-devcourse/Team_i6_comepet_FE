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
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Img = styled.img`
  width: 60%;
  height: 60%;
`;

export default NotFoundPage;
