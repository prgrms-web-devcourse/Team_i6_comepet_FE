import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Formik } from 'formik';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { FormError } from '@/components/FormError';
import { ShortHeader } from '@/components/Header';
import { CheckBox } from '@/components/CheckBox';
import { Seperator } from '@/components/Seperator';
import { Image } from '@/components/Image';
import { Modal } from '@/components/Modal';
import { USER_ERROR, REGEX } from '@/utils/constants';
import { getImageSrc, isValidInput } from '@/utils/helpers';
import { SocialLink } from './SocialLink';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <Wrapper>
      <ShortHeader location="로그인" />
      <Image
        src={getImageSrc('/images/logo.png')}
        width="12rem"
        height="12rem"
        margin="15% auto"
        borderRadius="50%"
        boxShadow="normal"
      />
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={validate}
        onSubmit={handleSubmit}>
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder="이메일"
            />
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
            <PasswordOptionWrapper>
              <CheckBox id="save-password" text="비밀번호 기억하기" fontColor="normalGray" />
              <UnderlineTextButton onClick={() => setIsModalVisible(true)}>
                비밀번호를 잊어버리셨나요?
              </UnderlineTextButton>
            </PasswordOptionWrapper>
            <Button
              type="submit"
              bgColor="brand"
              width="60%"
              margin="10% auto 8% auto"
              disabled={isSubmitting}>
              로그인
            </Button>
            <LoginOptionWrapper>
              <NormalText>계정이 없으신가요?</NormalText>
              <Link to="/sign-up">
                <UnderlineText>회원가입</UnderlineText>
              </Link>
            </LoginOptionWrapper>
            <Seperator type="horizon" width="100%" />
            <LoginOptionWrapper>
              <NormalText>소셜 로그인하기</NormalText>
            </LoginOptionWrapper>
            <SocialLinkWrapper>
              <SocialLink type="google" />
              <SocialLink type="kakao" />
              <SocialLink type="naver" />
            </SocialLinkWrapper>
          </Form>
        )}
      </Formik>
      {isModalVisible && <Modal width="90%" onClose={() => setIsModalVisible(false)}></Modal>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 20% 2.4rem 2.4rem 2.4rem;
  text-align: center;
`;

const Form = styled.form``;

const PasswordOptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 4% 0 0 0;
`;

const LoginOptionWrapper = styled.div`
  margin: 8% 0;
`;

const NormalText = styled.span`
  color: ${({ theme }) => theme.colors.lightGray};
  margin: 0 0.5rem;
  font-weight: bold;
`;

const UnderlineTextButton = styled.button`
  color: ${({ theme }) => theme.colors.normalGray};
  text-decoration: underline;
  font-size: 1rem;
  padding: 0;
`;

const UnderlineText = styled.span`
  color: ${({ theme }) => theme.colors.normalGray};
  text-decoration: underline;
`;

const SocialLinkWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default LoginPage;

const validate = ({ email, password }) => {
  const errors = {};
  const { NO_EMAIL, NO_PASSWORD, INVALID_EMAIL } = USER_ERROR;

  if (!email) {
    errors.email = NO_EMAIL;
  } else if (!isValidInput(REGEX.EMAIL, email)) {
    errors.email = INVALID_EMAIL;
  }

  if (!password) {
    errors.password = NO_PASSWORD;
  }

  return errors;
};

const handleSubmit = (values, { setSubmitting }) => {
  setTimeout(() => {
    // 테스트
    alert(JSON.stringify(values, null, 2));

    /* TODO : Post 요청 후 작업

     * 일치하는 회원 정보가 있다면
     * TOKEN & ID 저장
     * MainPage Redirect
    
     * 일치하는 회원 정보가 없다면
     * alert(USER_ERROR.NOT_MATCHED);
     */

    setSubmitting(false);
  }, 400);
};
