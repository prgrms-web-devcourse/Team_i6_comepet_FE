import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const getCookie = (name, option) => {
  return cookies.get(name, { ...option });
};

/* TODO: 서버 준비되면 secure, httpOnly 옵션 추가 필요 */
export const setCookie = (name, value, option) => {
  return cookies.set(name, value, { path: '/', ...option });
};

/* TODO: 서버 준비되면 secure, httpOnly 옵션 추가 필요 */
export const removeCookie = (name, option) => {
  return cookies.remove(name, { path: '/', ...option });
};
