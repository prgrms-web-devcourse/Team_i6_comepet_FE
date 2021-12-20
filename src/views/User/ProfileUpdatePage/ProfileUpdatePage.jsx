import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar } from '@/components/Avatar';
import { ShortHeader } from '@/components/Header';
import { Button } from '@/components/Button';
import { Label } from '@/components/Label';
import { Formik } from 'formik';
import { Input } from '@/components/Input';
import { FormError } from '@/components/FormError';
import { USER_ERROR, REGEX } from '@/utils/constants';
import { isValidInput } from '@/utils/helpers';
import { GET, POST } from '@/apis/axios';
import useSWR, { mutate } from 'swr';

const ProfileUpdatePage = () => {
  const { data: userData } = useSWR('/me', GET);
  const fakePassword = 'fakepw1!';
  const [previewImgURL, setPreviewImgURL] = useState('');

  useEffect(() => {
    setPreviewImgURL(userData?.image);
  }, [userData]);

  const handleSubmit = async ({ image, nickname, newPassword, newPasswordCheck }) => {
    const data = new FormData();
    const param = {};
    if (previewImgURL !== image) {
      data.append('image', image);
    }
    if (userData?.nickname !== nickname) {
      param.nickname = nickname;
    }
    if (newPassword !== fakePassword) {
      param.newPassword = newPassword;
      param.newPasswordCheck = newPasswordCheck;
    }

    data.append('param', new Blob([JSON.stringify(param)], { type: 'application/json' }));
    await POST('/me', data);
    alert('저장되었습니다.');
    mutate('/me');
  };

  return (
    <Wrapper>
      <ShortHeader location="개인정보수정" />
      <Formik
        enableReinitialize={true}
        initialValues={{
          image: userData?.image || '',
          email: userData?.email || '',
          nickname: userData?.nickname || '',
          newPassword: fakePassword,
          newPasswordCheck: fakePassword
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
                <Avatar size="8rem" src={previewImgURL} />
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
                  name="image"
                  accept="image/*"
                  onChange={({ target }) => {
                    const image = target.files[0];
                    if (image.size > 1024 * 1024 * 5) {
                      alert('5MB 이하의 사진만 업로드 가능합니다');
                    } else {
                      if (image) {
                        setFieldValue('image', image);
                        setPreviewImgURL(URL.createObjectURL(image));
                      }
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
              name="newPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.newPassword}
              placeholder="비밀번호"
            />
            <FormError isVisible={errors.newPassword && touched.newPassword}>
              {errors.newPassword}
            </FormError>
            <Input
              type="password"
              name="newPasswordCheck"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.newPasswordCheck}
              placeholder="비밀번호 확인"
            />
            <FormError isVisible={errors.newPasswordCheck && touched.newPasswordCheck}>
              {errors.newPasswordCheck}
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

const validate = ({ nickname, newPassword, newPasswordCheck }) => {
  const errors = {};
  const { NO_NICKNAME, NO_PASSWORD, INVALID_NICKNAME, INVALID_PASSWORD, INVALID_PASSWORD_CHECK } =
    USER_ERROR;

  if (!nickname) {
    errors.nickname = NO_NICKNAME;
  } else if (!isValidInput(REGEX.NICKNAME, nickname)) {
    errors.nickname = INVALID_NICKNAME;
  }

  if (!newPassword) {
    errors.newPassword = NO_PASSWORD;
  } else if (!isValidInput(REGEX.PASSWORD, newPassword)) {
    errors.newPassword = INVALID_PASSWORD;
  } else if (newPassword !== newPasswordCheck) {
    errors.newPasswordCheck = INVALID_PASSWORD_CHECK;
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
