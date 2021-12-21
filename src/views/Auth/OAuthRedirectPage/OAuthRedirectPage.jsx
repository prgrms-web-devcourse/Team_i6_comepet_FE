import React from 'react';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '@/utils/cookie';
import useAuth from '@/hooks/useAuth';

const OauthRedirectPage = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const TOKEN = new URL(window.location.href).searchParams.get('token');

  if (TOKEN) {
    setCookie('token', TOKEN);
    setIsLoggedIn(true);
    navigate('/', { replace: true });
  }

  return <></>;
};

export default OauthRedirectPage;
