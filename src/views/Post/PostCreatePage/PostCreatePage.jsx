import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Button } from '@/components/Button';
import {
  Status,
  Date,
  Place,
  Contact,
  PetInformation,
  ChipInformation,
  HashTag,
  Content,
  PetPhoto
} from './Category';
import ErrorModal from './ErrorModal/ErrorModal';
import useForm from '@/hooks/useForm';
// TODO: 삭제 예정
// const MARGIN_BETTWEN = Object.freeze({
//   SelectionBox_AND_Label: '1.8rem 0 0 0',
//   Input_AND_Label: '1.8rem 0 0 0',
//   Anything_AND_CheckBox: '0 0 0 1.6rem',
//   SelectionBox: '0 0 0 2rem',
//   CATEGORY: '2.4rem 0 0 0'
// });

const PostCreatePage = () => {
  const [isErrorExist, setIsErrorExist] = useState(false);
  const { values, errors, isLoading, handleChange, handleSubmit } = useForm({
    initialValues: {
      status: null,
      date: null,
      cityId: null,
      townId: null,
      detailAddress: null,
      telNumber: null,
      animalId: null,
      animalKindName: null,
      age: null,
      sex: null,
      chipNumber: null,
      tags: [],
      files: null,
      content: null
    },
    onSubmit: () => {},
    validate: ({ status, date, cityId, townId, animalId, animalKindName, sex, content }) => {
      const errors = {};

      if (!status) errors.status = '제목을 입력해주세요';
      if (!date) errors.date = '날짜를 입력해주세요';
      if (!cityId) errors.cityId = '시/도를 선택해주세요';
      if (!townId) errors.townId = '시/군/구를 선택해주세요';
      if (!animalId) errors.animalId = '동물 종류를 선택해주세요';
      if (!animalKindName) errors.animalKindName = '품종을 선택해주세요';
      if (!sex) errors.sex = '성별을 선택해주세요';
      if (!content) errors.content = '내용을 작성해주세요';
      Object.keys(errors).length !== 0 && setIsErrorExist(isErrorExist);
      return errors;
    }
  });

  // Eslint Error 방지용 로그
  console.log('Eslint Error 방지용 로그', values, errors, isLoading, handleSubmit);

  return (
    <Form onsumbit={handleSubmit}>
      <Status onChange={handleChange} />
      <Date margin="5rem 0 0 0" onChange={handleChange} />
      <Place margin="5rem 0 0 0" />
      <Contact margin="5rem 0 0 0" onChange={handleChange} />
      <PetInformation margin="5rem 0 0 0" onChange={handleChange} />
      <ChipInformation margin="5rem 0 0 0" onChange={handleChange} />
      <HashTag margin="5rem 0 0 0" onChange={handleChange} />
      <PetPhoto margin="5rem 0 0 0" />
      <Content margin="5rem 0 0 0" onChange={handleChange} />
      <ButtonWrapper margin="5rem 0 0 0">
        <Button width="60%" margin="5% auto 0 auto" bgColor="normalOrange" type="button">
          작성하기
        </Button>
        <Button width="60%" margin="5% auto 0 auto" bgColor="brand" type="button">
          취소하기
        </Button>
      </ButtonWrapper>
      {isErrorExist && <ErrorModal onClose={() => setIsErrorExist(false)} />}
    </Form>
  );
};

const Form = styled.form`
  padding: 1.7rem;
`;

const ButtonWrapper = styled.div`
  margin: ${({ margin }) => margin};
`;

PostCreatePage.propTypes = {};

export default PostCreatePage;
