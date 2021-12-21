import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { FormError } from '@/components/FormError';
import { ShortHeader } from '@/components/Header';
import { Image } from '@/components/Image';
import { Modal } from '@/components/Modal';
import { AuthCodeForm } from '@/views/Auth/SignupPage/AuthCodeForm';
import { POST } from '@/apis/axios';
import { setCookie } from '@/utils/cookie';
import { USER_ERROR, REGEX, AUTH_ERROR } from '@/utils/constants';
import { getImageSrc } from '@/utils/helpers';
import { isValidInput } from '@/utils/helpers';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [verifiedId, setVerifiedId] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async ({ nickname, email, password, passwordCheck }, { setSubmitting }) => {
    if (!verifiedId) {
      alert(AUTH_ERROR.NO_CODE);
      return;
    }

    try {
      const { token } = await POST('/sign-up', {
        nickname,
        email,
        password,
        passwordCheck,
        verifiedId
      });

      setCookie('token', token);
      navigate('/', { replace: true });
    } catch (error) {
      const detailCode = error.response.data.code;

      if (detailCode === 603) {
        alert(AUTH_ERROR.NOT_NORMAL);
        return;
      }

      alert(AUTH_ERROR.TRY_AGAIN);
    }

    setSubmitting(false);
  };

  const handleAuthButtonClick = async ({ target }) => {
    const inputEmailValue = target.previousSibling.value;

    if (!isValidInput(REGEX.EMAIL, inputEmailValue)) {
      alert(USER_ERROR.INVALID_EMAIL);
      return;
    }

    setIsModalVisible(true);
    setEmail(inputEmailValue);

    try {
      await POST('/send-email', { email: inputEmailValue });
    } catch (error) {
      setIsModalVisible(false);
      const statusCode = error.response.status;

      if (statusCode === 409) {
        alert(AUTH_ERROR.DUPLICATE);
        return;
      }

      alert(AUTH_ERROR.TRY_AGAIN);
    }
  };

  const setStateAfterEmailAuth = (id) => {
    setVerifiedId(id);
    setIsModalVisible(false);
  };

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
        initialValues={{ nickname: '', email: '', password: '', passwordCheck: '' }}
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
              <Button
                bgColor="brand"
                width="30%"
                margin="0 0 0 1rem"
                onClick={handleAuthButtonClick}>
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
              name="passwordCheck"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.passwordCheck}
              placeholder="비밀번호 확인"
            />
            <FormError isVisible={errors.passwordCheck && touched.passwordCheck}>
              {errors.passwordCheck}
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
      {isModalVisible && (
        <Modal maxWidth="35rem" onClose={() => setIsModalVisible(false)}>
          <AuthCodeForm emailForSignUp={email} setStateAfterEmailAuth={setStateAfterEmailAuth} />
        </Modal>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 8rem 2.4rem 2.4rem 2.4rem;
  text-align: center;
  margin: 0 auto;
`;

const Form = styled.form``;

const EmailInputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default SignupPage;

const validate = ({ nickname, email, password, passwordCheck }) => {
  const errors = {};
  const {
    NO_NICKNAME,
    NO_EMAIL,
    NO_PASSWORD,
    INVALID_NICKNAME,
    INVALID_EMAIL,
    INVALID_PASSWORD,
    INVALID_PASSWORD_CHECK
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
  } else if (password !== passwordCheck) {
    errors.passwordCheck = INVALID_PASSWORD_CHECK;
  }

  return errors;
};
