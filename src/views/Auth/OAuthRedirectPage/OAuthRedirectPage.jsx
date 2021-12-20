import React from 'react';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '@/utils/cookie';

const OauthRedirectPage = () => {
  const navigate = useNavigate();
  const TOKEN = new URL(window.location.href).searchParams.get('token');

  setCookie('token', TOKEN);
  navigate('/', { replace: true });
  window.location.reload();

  return <></>;
};

export default OauthRedirectPage;
