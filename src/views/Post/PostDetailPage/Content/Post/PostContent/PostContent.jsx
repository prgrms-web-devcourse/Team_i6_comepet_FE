import React from 'react';
import styled from '@emotion/styled';
import { Label } from '@/components/Label';

const PostContent = () => {
  return (
    <Wrapper>
      <LabelWrapper>
        <Label size="xsmall" bgColor="brand">
          실종
        </Label>
        <OneLineText bgColor="brand">실종</OneLineText>
      </LabelWrapper>
      <LabelWrapper>
        <Label size="xsmall" bgColor="brand">
          실종 날짜
        </Label>
        <OneLineText>2021년 11월 24일</OneLineText>
      </LabelWrapper>
      <LabelWrapper>
        <Label size="xsmall" bgColor="brand">
          장소
        </Label>
        <OneLineText>
          서울 특별시 영등포구 당산동 엠뷸런스 닉네임 최대 글자 맞춤 어떻게 주소가 될까 글자 맞춤
          어떻게 주소가 될까 글자 맞춤 어떻게 주소가 될까 글자 맞춤 어떻게 주소가 될까 글자 맞춤
          어떻게 주소가 될까 글자 맞춤 어떻게 주소가 될까
        </OneLineText>
      </LabelWrapper>
      <LabelWrapper>
        <Label size="xsmall" bgColor="brand">
          칩 번호
        </Label>
        <OneLineText>1234 567 8912 3456</OneLineText>
      </LabelWrapper>
      <LabelWrapper>
        <Label size="xsmall" bgColor="brand">
          연락처
        </Label>
        <OneLineText>010 1234 5678</OneLineText>
      </LabelWrapper>
      <Label size="xsmall" bgColor="brand">
        내용
      </Label>
      <DividedLineText>목에 레전드라는 이름표를 달고 있습니다</DividedLineText>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 1.4rem 0;
`;

const OneLineText = styled.span`
  width: 65%;
  word-break: keep-all;
  flex-grow: 1;
  margin-left: 1rem;
  font-size: 1.2rem;
`;

const DividedLineText = styled.div`
  margin-top: 1rem;
  font-size: 1.2rem;
`;

PostContent.propTypes = {};

export default PostContent;
