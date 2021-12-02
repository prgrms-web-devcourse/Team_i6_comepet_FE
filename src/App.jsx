import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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
    missing: '#E05858',
    completion: '#53CE50',
    sighting: '#FF8F5E',
    protection: '#1E1AFF'
  },
  sizes: {
    scrapCounter: {
      wrapper: {
        small: { width: '3.6rem', height: '1.6rem' },
        medium: { width: '4.8rem', height: '2.1rem' }
      },
      icon: { small: '1.2rem', medium: '1.6rem' },
      font: { small: '0.8rem', medium: '1.6rem' }
    }
  }
});

const App = function () {
  return <ThemeProvider theme={theme}></ThemeProvider>;
};

export default App;
