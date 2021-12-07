export const AUTH_ALERT = {};

export const DEV_ERROR = Object.freeze({
  INVALID_PROP: '잘못된 Prop이 입력되었습니다.'
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
