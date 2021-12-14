import React from 'react';
import styled from '@emotion/styled';
import { Formik } from 'formik';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { FormError } from '@/components/FormError';
import { USER_ERROR, REGEX } from '@/utils/constants';
import { isValidInput } from '@/utils/helpers';

const EmailAuthForm = () => {
  return (
    <Wrapper>
      <Text>임시 비밀번호 발급을 위해 이메일을 입력해 주세요</Text>
      <Formik initialValues={{ email: '' }} validate={validate} onSubmit={handleSubmit}>
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <InputWrapper>
              <Input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="이메일"
              />
              <Button
                type="submit"
                bgColor="brand"
                width="10rem"
                borderRadius="1rem"
                margin="0 0 0 1rem"
                disabled={isSubmitting}>
                전송
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

export default EmailAuthForm;

// TODO: helpers에 인자 여부에 따른 리팩토링 필요
const validate = ({ email }) => {
  const errors = {};
  const { NO_EMAIL, INVALID_EMAIL } = USER_ERROR;

  if (!email) {
    errors.email = NO_EMAIL;
  } else if (!isValidInput(REGEX.EMAIL, email)) {
    errors.email = INVALID_EMAIL;
  }

  return errors;
};

const handleSubmit = (values, { setSubmitting }) => {
  setTimeout(() => {
    // 테스트
    alert(JSON.stringify(values, null, 2));

    // TODO: 서버 요청

    setSubmitting(false);
  }, 400);
};
