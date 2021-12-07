import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SignupPage } from '@/views';
import useSWR from 'swr';

const theme = createTheme({
  colors: {
    brand: '#2A2E56',
    normalWhite: '#ffffff',
    normalBlack: '#2F3438',
    normalRed: '#E05858',
    normalPink: '#FF8585',
    normalGreen: '#3BAB29',
    normalGray: '#757575',
    lightGray: '#ADADAD',
    lighterGray: '#E5E5E5',
    errorBg100: '#FEF2F2',
    errorBg300: '#F87171',
    errorBg500: '#B91C1C',
    MISSING: '#E05858',
    COMPLETION: '#53CE50',
    DETECTION: '#FF8F5E',
    PROTECTION: '#1E1AFF'
  },
  shadows: {
    light: '0 0.4rem 1.6rem rgba(0, 0, 0, 0.08)',
    normal: '0 0.8rem 2.4rem rgba(0, 0, 0, 0.16)'
  },
  sizes: {
    scrapCounter: {
      wrapper: {
        small: { width: '3.6rem', height: '1.6rem' },
        medium: { width: '4.8rem', height: '2.1rem' }
      },
      icon: { small: '1.2rem', medium: '1.6rem' },
      font: { small: '0.8rem', medium: '1.6rem' }
    },
    statusTag: {
      wrapper: {
        small: { width: '5.6rem', height: '2.4rem' }
      }
    }
  }
});

import { GET } from '@/apis/axios';

const App = function () {
  const { data: animalListData, error: animalListError } = useSWR('/json', GET);

  animalListData && console.log(animalListData);
  // 응답 데이터 {data: {…}, serverDateTime: '2021-12-06T09:42:56.256433197'}
  animalListError && console.log(animalListError);

  // POST('/sign-up', signUpData);

  return (
    <ThemeProvider theme={theme}>
      <SignupPage></SignupPage>
    </ThemeProvider>
  );
};

export default App;
