export const AUTH_ALERT = {};

export const DEV_ERROR = Object.freeze({
  INVALID_PROP: '잘못된 Prop이 입력되었습니다.',
  INVALID_ARGS: '유효하지 않은 Argument입니다.'
});

export const USER_ERROR = Object.freeze({
  NO_NICKNAME: '닉네임을 입력해 주세요.',
  NO_EMAIL: '이메일을 입력해 주세요.',
  NO_PASSWORD: '비밀번호를 입력해 주세요',
  INVALID_NICKNAME: '2~10자 영문, 한글을 사용해 주세요.',
  INVALID_EMAIL: '잘못된 이메일 형식입니다.',
  INVALID_PASSWORD: '8~20자 영문, 숫자, 특수문자를 사용해 주세요.',
  INVALID_PASSWORD2: '비밀번호가 일치하지 않습니다.',
  NOT_MATCHED: '이메일 또는 비밀번호를 확인해 주세요.'
});

export const STATUS = Object.freeze({
  MISSING: '실종',
  COMPLETION: '완료',
  DETECTION: '목격',
  PROTECTION: '보호'
});

export const GENDER = Object.freeze({
  MALE: '수컷',
  FEMALE: '암컷'
});

export const REGEX = Object.freeze({
  NICKNAME: /^[가-힣a-zA-Z]{2,10}$/i,
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\d~!@#$%^&*()+|=]{8,20}$/
});
