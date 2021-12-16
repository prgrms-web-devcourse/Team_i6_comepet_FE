import React from 'react';
import { Routes, Route } from 'react-router-dom';

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
  ProfileUpdatePage
} from '@/views';

const App = function () {
  return (
    <Routes>
      <Route exact path="/sign-up" element={<SignupPage />} />
      <Route exact path="/login" element={<LoginPage />} />
      <Route exact path="/" element={<MainPage />} />
      <Route exact path="/post/create" element={<PostCreatePage />} />
      <Route exact path="/post/edit" element={<PostCreatePage />} />
      <Route exact path="/post/:id" element={<PostDetailPage />} />
      <Route exact path="/shelter" element={<ShelterPostPage />} />
      <Route exact path="/shelter/:id" element={<ShelterPostDetailPage />} />
      <Route exact path="/edit/profile" element={<ProfileUpdatePage />} />
      <Route exact path="/edit/area" element={<LikeAreaPage />} />
      <Route exact path="/user/post" element={<MyPostPage />} />
      <Route exact path="/user/scrap" element={<MyScrapPage />} />
      <Route exact path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
