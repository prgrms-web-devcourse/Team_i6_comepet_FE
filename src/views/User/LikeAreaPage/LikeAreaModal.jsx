import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import LineBreakWrapper from '@/views/Post/PostCreatePage/Category/Common/LineBreakWrapper';
import { Modal } from '@/components/Modal';
import { Label } from '@/components/Label';
import { SelectionBox } from '@/components/SelectionBox';
import { BackgroundBox } from '@/components/BackgroundBox';
import { Button } from '@/components/Button';

const LikeAreaModal = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <BackgroundBox width="30rem" height="40rem">
        <Wrapper>
          <Label forHtml="areas" bgColor="brand" fontSize="0.8rem">
            장소
          </Label>
          <LineBreakWrapper margin="1.8rem 0 0 0.8rem">
            <SelectionBox
              options={['서울특별시', '부산광역시', '경기도', '강원도']}
              defaultOption="시/도"
              required={true}
              fontSize="1rem"
              fontColor="lightGray"
              isColored="true"
            />
            <SelectionBox
              options={['강북구', '송파구', '노원구', '강남구']}
              defaultOption="시/군/구"
              required={true}
              margin="0 0 0 2rem"
              fontSize="1rem"
              fontColor="lightGray"
              isColored="true"
            />
          </LineBreakWrapper>
          <Button type="button" bgColor="brand" margin="22rem auto">
            검색
          </Button>
        </Wrapper>
      </BackgroundBox>
    </Modal>
  );
};
const Wrapper = styled.div`
  padding: 2.4rem;
  width: 100%;
  height: 100%;
`;

LikeAreaModal.propTypes = {
  onClose: PropTypes.func
};

export default LikeAreaModal;
