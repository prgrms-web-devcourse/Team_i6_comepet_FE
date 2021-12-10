import { useState } from 'react';
import { Avatar } from '@/components/Avatar';
import styled from '@emotion/styled';
import SettingsIcon from '@mui/icons-material/Settings';
import { ShortHeader } from '@/components/Header';
import { Button } from '@/components/Button';
import { Formik } from 'formik';
import { Input } from '@/components/Input';
import { FormError } from '@/components/FormError';
import { USER_ERROR, REGEX } from '@/utils/constants';

const ProfileUpdatePage = () => {
  const [previewURL, setPreviewURL] = useState(``);

  const handleSubmit = async (values) => {
    const data = new FormData();
    data.append('file', values.file);
    data.append('nickname', values.nickname);
    data.append('newPassword', values.password);
    data.append('newPasswordCheck', values.password2);
    for (let value of data.values()) {
      console.log(value);
    }
  };

  return (
    <Wrapper>
      <ShortHeader location="개인정보수정" />
      <ProfileUpdateWrapper>
        <Formik
          initialValues={{
            file: ``,
            nickname: '',
            email: '',
            password: '',
            password2: ''
          }}
          validate={validate}
          onSubmit={handleSubmit}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            isSubmitting
          }) => (
            <Form onSubmit={handleSubmit}>
              <ProfilePictureWrapper>
                <AvatarWrapper>
                  <Avatar size="8rem" src={previewURL} />
                  <StyledSettingsIcon />
                </AvatarWrapper>
                <label>
                  <StyledP>프로필 이미지 변경</StyledP>
                  <input
                    type="file"
                    name="file"
                    accept=".png,.jpg,.jpeg"
                    onChange={(event) => {
                      const file = event.target.files[0];
                      if (file) setPreviewURL(URL.createObjectURL(file));
                      setFieldValue('file', file);
                    }}
                    hidden
                  />
                </label>
              </ProfilePictureWrapper>
              <Input
                type="text"
                name="nickname"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.nickname}
                placeholder="닉네임"
              />
              <FormError isVisible={errors.nickname && touched.nickname}>
                {errors.nickname}
              </FormError>
              <Input
                margin="0 0 4rem 0"
                type="email"
                name="email"
                bgColor="lighterGray"
                value={values.email}
                placeholder="이메일"
                disabled
              />
              <Input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="비밀번호"
              />
              <FormError isVisible={errors.password && touched.password}>
                {errors.password}
              </FormError>
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
                margin="0 auto"
                width="26rem"
                height="4rem"
                bgColor="normalOrange"
                onSubmit={handleSubmit}
                disabled={isSubmitting}>
                저장하기
              </Button>
            </Form>
          )}
        </Formik>
      </ProfileUpdateWrapper>
    </Wrapper>
  );
};

export default ProfileUpdatePage;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const ProfileUpdateWrapper = styled.div`
  display: flex;
  margin-top: 5.2rem;
  width: 100%;
  height: 90%;
  justify-content: center;
  align-content: center;
`;
const Form = styled.form`
  width: 80%;
`;
const ProfilePictureWrapper = styled.div`
  display: flex;
  height: 17.6rem;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
`;
const AvatarWrapper = styled.div`
  position: relative;
`;
const StyledSettingsIcon = styled(SettingsIcon)`
  position: absolute;
  bottom: 0.1rem;
  right: -0.6rem;
  color: ${({ theme }) => theme.colors.normalWhite};
  background-color: ${({ theme }) => theme.colors.normalOrange};
  border-radius: 0.4rem;
  font-size: 1.8rem;
  z-index: -1;
`;
const StyledP = styled.p`
  color: ${({ theme }) => theme.colors.lightGray};
  font-size: 0.9rem;
`;
const validate = ({ nickname, password, password2 }) => {
  const errors = {};
  const { NO_NICKNAME, NO_PASSWORD, INVALID_NICKNAME, INVALID_PASSWORD, INVALID_PASSWORD2 } =
    USER_ERROR;

  if (!nickname) {
    errors.nickname = NO_NICKNAME;
  } else if (!isValidInput(REGEX.NICKNAME, nickname)) {
    errors.nickname = INVALID_NICKNAME;
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
