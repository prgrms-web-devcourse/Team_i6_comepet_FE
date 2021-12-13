import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { FormError } from '@/components/FormError';
import { USER_ERROR, REGEX } from '@/utils/constants';
import { isValidProp } from '@/utils/helpers';
import { DEV_ERROR } from '@/utils/constants';
import { POST } from '@/apis/axios';

const EmailAuthForm = ({ usedAt, emailForSignUp, setStateAfterEmailAuth }) => {
  if (!isValidProp(usedAt, ['sign-up', 'login'])) {
    console.error(DEV_ERROR.INVALID_PROP);
    return;
  }

  const switchNoticeTextBy = (usedAt) => {
    switch (usedAt) {
      case 'sign-up':
        return '이메일로 전송된 인증 코드를 입력해 주세요';
      case 'login':
        return '임시 비밀번호 발급을 위해 이메일을 입력해 주세요';
    }
  };

  const handleSubmit = async ({ email, code }, { setSubmitting }) => {
    switch (usedAt) {
      case 'sign-up': {
        const response = await POST('verify-email', {
          email: emailForSignUp,
          key: code
        });

        const verifiedId = response.data.id;
        setStateAfterEmailAuth(verifiedId);
        break;
      }
      case 'login': {
        console.log(email);
        break;
      }
    }
    setSubmitting(false);
  };

  const switchButtonTextBy = (usedAt) => {
    switch (usedAt) {
      case 'sign-up':
        return '확인';
      case 'login':
        return '전송';
    }
  };

  return (
    <Wrapper>
      <Text>{switchNoticeTextBy(usedAt)}</Text>
      <Formik initialValues={{ email: '', code: '' }} validate={validate} onSubmit={handleSubmit}>
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <InputWrapper>
              {usedAt === 'login' && (
                <Input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="이메일"
                />
              )}
              {usedAt === 'sign-up' && (
                <Input
                  type="text"
                  name="code"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.code}
                  placeholder="인증 코드"
                />
              )}
              <Button
                type="submit"
                bgColor="brand"
                width="10rem"
                borderRadius="1rem"
                margin="0 0 0 1rem"
                disabled={isSubmitting}>
                {switchButtonTextBy(usedAt)}
              </Button>
            </InputWrapper>
            <FormError isVisible={errors.email && touched.email}>{errors.email}</FormError>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 1rem 1rem 0 1rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.lighterBlue};
  font-size: 1.2rem;
`;

const Text = styled.div`
  color: ${({ theme }) => theme.colors.normalGray};
  margin: 1rem 0;
`;

const Form = styled.form`
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0 0 0;
`;

EmailAuthForm.propTypes = {
  usedAt: PropTypes.string,
  emailForSignUp: PropTypes.string,
  setStateAfterEmailAuth: PropTypes.func
};

export default EmailAuthForm;

const validate = ({ email }) => {
  if (!email) return;

  const errors = {};
  const { NO_EMAIL, INVALID_EMAIL } = USER_ERROR;

  if (!email) {
    errors.email = NO_EMAIL;
  } else if (!isValidProp(REGEX.EMAIL, email)) {
    errors.email = INVALID_EMAIL;
  }

  return errors;
};
