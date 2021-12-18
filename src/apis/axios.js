import axios from '@/apis/config';
import { DEV_ERROR } from '@/utils/constants';

export const GET = async (url) => {
  if (!url) {
    console.error(DEV_ERROR.INVALID_ARGS);
    return;
  }

  try {
    const { data } = await axios({
      method: 'get',
      url
    });

    return data.data;
  } catch (error) {
    handleConsoleError(error);
    throw error;
  }
};

export const POST = async (url, body, headers) => {
  if (!(url && body)) {
    console.error(DEV_ERROR.INVALID_ARGS);
    return;
  }

  try {
    const { data } = await axios({
      method: 'post',
      url,
      data: body,
      headers
    });

    return data.data;
  } catch (error) {
    handleConsoleError(error);
    throw error;
  }
};

export const PUT = async (url, body) => {
  if (!(url && body)) {
    console.error(DEV_ERROR.INVALID_ARGS);
    return;
  }

  try {
    const { data } = await axios({
      method: 'put',
      url,
      data: body
    });

    return data.data;
  } catch (error) {
    handleConsoleError(error);
    throw error;
  }
};

export const DELETE = async (url, body) => {
  if (!(url && body)) {
    console.error(DEV_ERROR.INVALID_ARGS);
    return;
  }

  try {
    const { data } = await axios({
      method: 'delete',
      url,
      data: body
    });

    return data.data;
  } catch (error) {
    handleConsoleError(error);
    throw error;
  }
};

export const PATCH = async (url, body, headers) => {
  if (!(url && body)) {
    console.error(DEV_ERROR.INVALID_ARGS);
    return;
  }

  try {
    const { data } = await axios({
      method: 'patch',
      url,
      data: body,
      headers
    });

    return data.data;
  } catch (error) {
    handleConsoleError(error);
    throw error;
  }
};

const handleConsoleError = (error) => {
  const { request, response } = error;

  if (response) {
    console.error('요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.');
  } else if (request) {
    console.error('요청이 이루어졌으나 응답을 받지 못했습니다.');
  } else {
    console.error('오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.');
  }
};
