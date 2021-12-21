import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { AUTH_ERROR } from '@/utils/constants';
import { POST } from '@/apis/axios';
import useForm from '@/hooks/useForm';

const AuthCodeForm = ({ emailForSignUp, setStateAfterEmailAuth }) => {
  const { values, isLoading, setIsLoading, handleChange, handleSubmit } = useForm({
    initialValues: { key: '' },
    onSubmit: async () => {
      try {
        const { id: verifiedId } = await POST('/verify-email', {
          email: emailForSignUp,
          key: values.key
        });

        setStateAfterEmailAuth(verifiedId);
      } catch (error) {
        const detailCode = error.response.data.code;

        if (detailCode === 604) {
          alert(AUTH_ERROR.INVALID_CODE);
          return;
        }

        alert(AUTH_ERROR.TRY_AGAIN);
      }
    }
  });

  useEffect(() => {
    return () => setIsLoading(false);
  }, []);

  return (
    <Wrapper>
      <Text>이메일로 전송된 인증 코드를 입력해 주세요.</Text>
      <Form onSubmit={handleSubmit}>
        <InputWrapper>
          <Input
            type="text"
            name="key"
            onChange={handleChange}
            value={values.key}
            placeholder="인증 코드"
          />
          <Button
            type="submit"
            bgColor="brand"
            width="10rem"
            borderRadius="1rem"
            margin="0 0 0 1rem"
            disabled={isLoading}>
            확인
          </Button>
        </InputWrapper>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.4rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.lighterBlue};
  font-size: 1.2rem;
`;

const Text = styled.div`
  color: ${({ theme }) => theme.colors.normalGray};
  margin: 0 0 1rem 0;
`;

const Form = styled.form``;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0 0 0;
`;

AuthCodeForm.propTypes = {
  emailForSignUp: PropTypes.string,
  setStateAfterEmailAuth: PropTypes.func
};

export default AuthCodeForm;
