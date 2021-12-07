import axios from '@/apis/config';
import { DEV_ERROR } from '@/utils/constants';

export const GET = async (url) => {
  if (!url) {
    console.error(DEV_ERROR.INVALID_ARGS);
    return;
  }

  try {
    const response = await axios({
      method: 'get',
      url
    });

    return response.data;
  } catch (error) {
    handleConsoleError(error);
    throw error;
  }
};

export const POST = async (url, data) => {
  if (!(url && data)) {
    console.error(DEV_ERROR.INVALID_ARGS);
    return;
  }

  try {
    const response = await axios({
      method: 'post',
      url,
      data: JSON.stringify(data)
    });

    return response.data;
  } catch (error) {
    handleConsoleError(error);
    throw error;
  }
};

export const PUT = async (url, data) => {
  if (!(url && data)) {
    console.error(DEV_ERROR.INVALID_ARGS);
    return;
  }

  try {
    const response = await axios({
      method: 'put',
      url,
      data
    });

    return response.data;
  } catch (error) {
    handleConsoleError(error);
    throw error;
  }
};

export const DELETE = async (url, data) => {
  if (!(url && data)) {
    console.error(DEV_ERROR.INVALID_ARGS);
    return;
  }

  try {
    const response = await axios({
      method: 'delete',
      url,
      data
    });

    return response.data;
  } catch (error) {
    handleConsoleError(error);
    throw error;
  }
};

const handleConsoleError = (error) => {
  const { request, response, message } = error;
  const { data, status, headers } = response;

  if (response) {
    console.log(`data : ${data}`);
    console.log(`status : ${status}`);
    console.log(`headers : ${headers}`);
    console.error('요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.');
  } else if (request) {
    console.log(`request : ${request}`);
    console.error('요청이 이루어졌으나 응답을 받지 못했습니다.');
  } else {
    console.log(`message : ${message}`);
    console.error('오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.');
  }
};
