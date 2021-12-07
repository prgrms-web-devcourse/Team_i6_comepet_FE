import React from 'react';
import styled from '@emotion/styled';
import { Formik } from 'formik';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { FormError } from '@/components/FormError';
import { ShortHeader } from '@/components/ShortHeader';
import { USER_ERROR, REGEX } from '@/utils/constants';
import { Image } from '@/components/Image';
import { getImageSrc } from '@/utils/helpers';

const SignupPage = () => {
  return (
    <Wrapper>
      <ShortHeader location="회원가입" />
      <Image
        src={getImageSrc('/images/logo.png')}
        width="12rem"
        height="12rem"
        margin="15% auto"
        borderRadius="50%"
        boxShadow="normal"
      />
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
            <FormError isVisible={errors.nickname && touched.nickname}>{errors.nickname}</FormError>
            <EmailInputWrapper>
              <Input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="이메일"
              />
              <Button type="button" bgColor="brand" width="30%" margin="0 0 0 1rem">
                인증
              </Button>
            </EmailInputWrapper>
            <FormError isVisible={errors.email && touched.email}>{errors.email}</FormError>
            <Input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              placeholder="비밀번호"
            />
            <FormError isVisible={errors.password && touched.password}>{errors.password}</FormError>
            <Input
              type="password"
              name="password2"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password2}
              placeholder="비밀번호 확인"
            />
            <FormError isVisible={errors.password2 && touched.password2}>
              {errors.password2}
            </FormError>
            <Button
              type="submit"
              bgColor="brand"
              width="60%"
              margin="10% auto 0 auto"
              disabled={isSubmitting}>
              회원가입
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 0 2.4rem 2.4rem 2.4rem;
  text-align: center;
`;

const Form = styled.form``;

const EmailInputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default SignupPage;

const validate = ({ nickname, email, password, password2 }) => {
  const errors = {};
  const {
    NO_NICKNAME,
    NO_EMAIL,
    NO_PASSWORD,
    INVALID_NICKNAME,
    INVALID_EMAIL,
    INVALID_PASSWORD,
    INVALID_PASSWORD2
  } = USER_ERROR;

  if (!nickname) {
    errors.nickname = NO_NICKNAME;
  } else if (!isValidInput(REGEX.NICKNAME, nickname)) {
    errors.nickname = INVALID_NICKNAME;
  }

  if (!email) {
    errors.email = NO_EMAIL;
  } else if (!isValidInput(REGEX.EMAIL, email)) {
    errors.email = INVALID_EMAIL;
  }

  if (!password) {
    errors.password = NO_PASSWORD;
  } else if (!isValidInput(REGEX.PASSWORD, password)) {
    errors.password = INVALID_PASSWORD;
  } else if (password !== password2) {
    errors.password2 = INVALID_PASSWORD2;
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
