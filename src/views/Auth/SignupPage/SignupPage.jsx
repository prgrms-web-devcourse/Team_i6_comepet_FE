import React from 'react';
import styled from '@emotion/styled';
import { Formik } from 'formik';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { FormError } from '@/components/FormError';

const SignupPage = () => (
  <Wrapper>
    <Formik
      initialValues={{ nickname: '', email: '', password: '', password2: '' }}
      validate={validate}
      onSubmit={handleSubmit}>
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="nickname"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.nickname}
            placeholder="닉네임"
          />
          <FormError displayed={errors.nickname && touched.nickname}>{errors.nickname}</FormError>
          <Input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            placeholder="이메일"
          />
          <FormError displayed={errors.email && touched.email}>{errors.email}</FormError>
          <Input
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            placeholder="비밀번호"
          />
          <FormError displayed={errors.password && touched.password}>{errors.password}</FormError>
          <Input
            type="password"
            name="password2"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password2}
            placeholder="비밀번호 확인"
          />
          <FormError displayed={errors.password2 && touched.password2}>
            {errors.password2}
          </FormError>
          <Button type="submit" bgColor="brand" width="60%" disabled={isSubmitting}>
            회원가입
          </Button>
        </Form>
      )}
    </Formik>
  </Wrapper>
);

const Wrapper = styled.div`
  padding: 4.8rem 2.4rem;
`;

const Form = styled.form`
  text-align: center;
`;

export default SignupPage;

const validate = ({ nickname, email, password, password2 }) => {
  const errors = {};
  const regexForNickname = /^[가-힣a-zA-Z]{2,10}$/i;
  const regexForEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const regexForPassword =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\d~!@#$%^&*()+|=]{8,20}$/;

  if (!nickname) {
    errors.nickname = '닉네임을 입력해 주세요.';
  } else if (!isValidInput(regexForNickname, nickname)) {
    errors.nickname = '2~10자 영문, 한글을 사용해 주세요';
  }

  if (!email) {
    errors.email = '이메일을 입력해 주세요.';
  } else if (!isValidInput(regexForEmail, email)) {
    errors.email = '잘못된 이메일 형식입니다.';
  }

  if (!password) {
    errors.password = '비밀번호를 입력해 주세요.';
  } else if (!isValidInput(regexForPassword, password)) {
    errors.password = '8~20자 영문, 숫자, 특수문자를 사용해 주세요.';
  } else if (password !== password2) {
    errors.password2 = '비밀번호가 일치하지 않습니다.';
  }

  return errors;
};

const isValidInput = (regex, target) => {
  return regex.test(target);
};

const handleSubmit = (values, { setSubmitting }) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
  }, 400);
};
