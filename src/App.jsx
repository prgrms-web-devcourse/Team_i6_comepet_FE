import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { RequireAuth, RestrictUser } from '@/components/AuthRoute';
import { AuthProvider } from '@/contexts/AuthProvider';

import {
  LoginPage,
  SignupPage,
  MainPage,
  ShelterPostPage,
  NotFoundPage,
  PostCreatePage,
  PostDetailPage,
  ShelterPostDetailPage,
  LikeAreaPage,
  MyPostPage,
  MyScrapPage,
  ProfileUpdatePage,
  PostCompilePage
} from '@/views';

const App = function () {
  initScrollForReload();

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
        <Route path="/shelter" element={<ShelterPostPage />} />
        <Route path="/shelter/:id" element={<ShelterPostDetailPage />} />
        <Route element={<RestrictUser />}>
          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="/post/create" element={<PostCreatePage />} />
          <Route path="/post/edit/:id" element={<PostCompilePage />} />
          <Route path="/edit/profile" element={<ProfileUpdatePage />} />
          <Route path="/edit/area" element={<LikeAreaPage />} />
          <Route path="/user/post" element={<MyPostPage />} />
          <Route path="/user/scrap" element={<MyScrapPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;

const initScrollForReload = () => {
  window.onbeforeunload = () => {
    window.scrollTo(0, 0);
  };
};
