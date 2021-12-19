export const NOTICE = {
  SENT_EMAIL: '이메일이 전송되었습니다.'
};

export const AUTH_ERROR = {
  DUPLICATE: '이미 가입된 이메일입니다.',
  INVALID_CODE: '잘못된 인증 코드입니다.',
  TRY_AGAIN: '서버 에러가 발생했습니다. 다시 시도해주세요.',
  NOT_NORMAL: '비정상적인 접근입니다. 다시 시도해주세요.',
  NO_CODE: '이메일 인증을 완료해주세요.',
  NO_EMAIL: '가입되지 않은 이메일입니다.',
  INVALID_PASSWORD: '비밀번호가 일치하지 않습니다.',
  REQUESTING: '요청을 처리 중입니다. 잠시만 기다려주세요.',
  EXPIRED_TOKEN: '로그인이 만료되었습니다. 다시 로그인해주세요.'
};

export const DEV_ERROR = Object.freeze({
  INVALID_PROP: '잘못된 Prop이 입력되었습니다.',
  INVALID_ARGS: '유효하지 않은 Argument입니다.',
  LOAD_FAILED: '데이터를 불러오는 데 실패했습니다.'
});

export const USER_ERROR = Object.freeze({
  NO_NICKNAME: '닉네임을 입력해 주세요.',
  NO_EMAIL: '이메일을 입력해 주세요.',
  NO_PASSWORD: '비밀번호를 입력해 주세요',
  INVALID_NICKNAME: '2~10자 영문, 한글을 사용해 주세요.',
  INVALID_EMAIL: '잘못된 이메일 형식입니다.',
  INVALID_PASSWORD: '8~20자 영문, 숫자, 특수문자를 사용해 주세요.',
  INVALID_PASSWORD_CHECK: '비밀번호가 일치하지 않습니다.',
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
