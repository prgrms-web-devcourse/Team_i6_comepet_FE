import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { BackgroundBox } from '@/components/BackgroundBox';
import { Button } from '@/components/Button';
import { PetInformation, Place, Status } from './Category';
import useForm from '@/hooks/useForm';

const SearchModal = ({ isVisible, left, top, right, bottom, translate }) => {
  const [isErrorExist, setIsErrorExist] = useState(false);
  const { values, errors, isLoading, handleChange, handleSubmit } = useForm({
    initialValues: {
      status: null,
      city: null,
      town: null,
      animal: null,
      animalKindName: null,
      sex: null,
      start: null,
      end: null,
      page: null,
      size: null,
      sort: null
    },
    onSubmit: () => {},
    validate: ({ status, city, town }) => {
      const errors = {};
      if (!status) errors.content = '내용을 작성해주세요';
      if (!city || !town) errors.content = '장소를 입력해주세요';
      Object.keys(errors).length !== 0 && setIsErrorExist(isErrorExist);
      return errors;
    }
  });

  // Eslint Error 방지용 콘솔
  console.log(values, errors, isLoading, handleChange, handleSubmit);

  return (
    <Wrapper
      isVisible={isVisible}
      top={top}
      left={left}
      right={right}
      bottom={bottom}
      translate={translate}>
      <BackgroundBox>
        <Form width="31.2rem" height="45.2rem" padding="1.8rem">
          <CategoryWrapper>
            <Status onChange={handleChange} />
            <Place margin="1rem 0 0 0" onChange={handleChange} />
            <PetInformation margin="1rem 0 0 0" />
          </CategoryWrapper>
          <Button bgColor="brand" margin="1rem 0 0 0">
            검색
          </Button>
        </Form>
      </BackgroundBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  bottom: ${({ bottom }) => bottom};
  right: ${({ right }) => right};
  transform: ${({ translate }) => translate};
  z-index: 1001;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding: ${({ padding }) => padding};
`;

const CategoryWrapper = styled.div`
  flex-grow: 1;
`;

SearchModal.propTypes = {
  isVisible: PropTypes.bool,
  place: PropTypes.string,
  top: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string,
  bottom: PropTypes.string,
  translate: PropTypes.string
};

export default SearchModal;
