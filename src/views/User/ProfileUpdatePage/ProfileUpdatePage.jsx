import { useState } from 'react';
import { Avatar } from '@/components/Avatar';
import styled from '@emotion/styled';
import SettingsIcon from '@mui/icons-material/Settings';
import { ShortHeader } from '@/components/Header';
import { Button } from '@/components/Button';
import { Label } from '@/components/Label';
import { Formik } from 'formik';
import { Input } from '@/components/Input';
import { FormError } from '@/components/FormError';
import { USER_ERROR, REGEX } from '@/utils/constants';
import { isValidInput } from '@/utils/helpers';

const ProfileUpdatePage = () => {
  const [previewURL, setPreviewURL] = useState(``);

  const handleSubmit = async (values) => {
    const data = new FormData();
    data.append('file', values.file);
    data.append('nickname', values.nickname);
    data.append('newPassword', values.password);
    data.append('newPasswordCheck', values.passwordCheck);
  };

  return (
    <Wrapper>
      <ShortHeader location="개인정보수정" />
      <Formik
        initialValues={{
          file: '',
          nickname: '',
          email: '',
          password: '',
          passwordCheck: ''
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
              <Label
                forHtml="file"
                fontSize="0.9rem"
                color="lightGray"
                bgColor="normalWhite"
                padding="0"
                borderRadius="0"
                fontWeight="normal">
                프로필 이미지 변경
                <input
                  type="file"
                  name="file"
                  accept=".png,.jpg,.jpeg"
                  onChange={(event) => {
                    const file = event.target.files[0];
                    if (file.size > 1024 * 1024 * 5) {
                      alert('5MB 이하의 사진만 업로드 가능합니다');
                    } else {
                      if (file) setPreviewURL(URL.createObjectURL(file));
                      setFieldValue('file', file);
                    }
                  }}
                  hidden
                />
              </Label>
            </ProfilePictureWrapper>
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
              type="text"
              name="nickname"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.nickname}
              placeholder="닉네임"
            />
            <FormError isVisible={errors.nickname && touched.nickname}>{errors.nickname}</FormError>
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
    </Wrapper>
  );
};

const validate = ({ nickname, password, passwordCheck }) => {
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
  } else if (password !== passwordCheck) {
    errors.passwordCheck = INVALID_PASSWORD2;
  }

  return errors;
};

export default ProfileUpdatePage;

const Wrapper = styled.div`
  padding: 0 2.4rem 2.4rem 2.4rem;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5.2rem 0 0 0;
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
