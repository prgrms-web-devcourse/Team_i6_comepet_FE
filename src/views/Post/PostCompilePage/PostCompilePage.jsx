import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/Button';
import { ShortHeader } from '@/components/Header';
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
import useSWR from 'swr';
import { GET, POST } from '@/apis/axios';

const PostCompilePage = () => {
  const { id: postId } = useParams();

  const [isErrorExist, setIsErrorExist] = useState(false);
  const navigate = useNavigate();

  const { values, handleChange, handleSubmit } = useForm({
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
      content: null,
      images: []
    },
    onSubmit: async () => {
      const formData = makeFormDataAppendingImages(values.images);

      values.images = [];

      const param = values; // eslint-disable-line no-unused-vars
      formData.append('param', new Blob([JSON.stringify(param)], { type: 'application/json' }));

      const res = await POST(`/missing-posts/${postId}`, formData, { type: 'multipart/form-data' });
      return res;
    },
    handleNavigate: (res) => {
      navigate(`/post/${res.id}`, { replace: true });
    },
    validate: ({
      status,
      date,
      telNumber,
      cityId,
      townId,
      animalId,
      animalKindName,
      sex,
      age,
      content
    }) => {
      const errors = {};

      if (!status) errors.status = '상태를 입력해주세요';
      if (!date) errors.date = '날짜를 입력해주세요';
      if (!cityId) errors.cityId = '시/도를 선택해주세요';
      if (!townId) errors.townId = '시/군/구를 선택해주세요';
      if (!animalId) errors.animalId = '동물 종류를 선택해주세요';
      if (!animalKindName) errors.animalKindName = '품종을 선택해주세요';
      if (!telNumber) errors.telNumber = '전화번호를 입력해주세요';
      if (!sex) errors.sex = '성별을 선택해주세요';
      if (!age) errors.age = '나이를 입력해주세요';
      if (!content) errors.content = '내용을 작성해주세요';
      Object.keys(errors).length !== 0 && setIsErrorExist(isErrorExist);
      return errors;
    }
  });

  const { data: placeData } = useSWR('/cities', GET);
  const { data: animalData } = useSWR('/animals', GET);
  if (!placeData || !animalData) return <div></div>;

  return (
    <Wrapper>
      <ShortHeader />
      <Form onsumbit={handleSubmit}>
        <Status onChange={handleChange} />
        <Date margin="5rem 0 0 0" onChange={handleChange} />
        <Place margin="5rem 0 0 0" onChange={handleChange} placeData={placeData.cities} />
        <Contact margin="5rem 0 0 0" onChange={handleChange} />
        <PetInformation
          margin="5rem 0 0 0"
          animalData={animalData.animals}
          onChange={handleChange}
        />
        <ChipInformation margin="5rem 0 0 0" onChange={handleChange} />
        <HashTag margin="5rem 0 0 0" onChange={handleChange} />
        <PetPhoto margin="5rem 0 0 0" onChange={handleChange} />
        <Content margin="5rem 0 0 0" onChange={handleChange} />
        <ButtonWrapper margin="5rem 0 0 0">
          <Button
            width="60%"
            margin="5% auto 0 auto"
            bgColor="normalOrange"
            onClick={handleSubmit}
            type="button">
            작성하기
          </Button>
          <Button
            width="60%"
            margin="5% auto 0 auto"
            bgColor="brand"
            onClick={handleSubmit}
            type="button">
            취소하기
          </Button>
        </ButtonWrapper>
        {isErrorExist && <ErrorModal onClose={() => setIsErrorExist(false)} />}
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 20% 1.7rem 1.7rem 1.7rem;
`;

const Form = styled.form``;

const ButtonWrapper = styled.div`
  margin: ${({ margin }) => margin};
`;

PostCompilePage.propTypes = {};

export default PostCompilePage;

const makeFormDataAppendingImages = (images) => {
  const formData = new FormData();

  for (let i = 0; i < images?.length; i++) {
    formData.append('images', images[i]);
  }

  if (images.length === 0) formData.append('images', []);

  return formData;
};
