import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Label } from '@/components/Label';
import { STATUS } from '@/utils/constants';

const PostContent = ({
  status,
  date,
  city,
  town,
  detailAddress,
  chipNumber,
  telNumber,
  content
}) => {
  return (
    <Wrapper>
      <LabelWrapper>
        <Label size="xsmall" bgColor="brand">
          상태
        </Label>
        <OneLineText bgColor="brand">{STATUS[status]}</OneLineText>
      </LabelWrapper>
      <LabelWrapper>
        <Label size="xsmall" bgColor="brand">
          실종 날짜
        </Label>
        <OneLineText>{date}</OneLineText>
      </LabelWrapper>
      <LabelWrapper>
        <Label size="xsmall" bgColor="brand">
          장소
        </Label>
        <OneLineText>{`${city} ${town} ${detailAddress || ''}`}</OneLineText>
      </LabelWrapper>
      <LabelWrapper>
        <Label size="xsmall" bgColor="brand">
          칩 번호
        </Label>
        <OneLineText>{chipNumber || '모름'}</OneLineText>
      </LabelWrapper>
      <LabelWrapper>
        <Label size="xsmall" bgColor="brand">
          연락처
        </Label>
        <OneLineText>{telNumber}</OneLineText>
      </LabelWrapper>
      <Label size="xsmall" bgColor="brand">
        내용
      </Label>
      <DividedLineText>{content}</DividedLineText>
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
  font-size: 1.4rem;
  line-height: 2rem;
  word-break: keep-all;
`;

PostContent.propTypes = {
  status: PropTypes.string,
  date: PropTypes.string,
  city: PropTypes.string,
  town: PropTypes.string,
  detailAddress: PropTypes.string,
  chipNumber: PropTypes.string,
  telNumber: PropTypes.string,
  content: PropTypes.string
};

export default PostContent;
