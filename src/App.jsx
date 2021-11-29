import React from 'react';
import { ThemeProvider } from '@emotion/react';

const theme = {
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
  }
};

const App = function () {
  return <ThemeProvider theme={theme}></ThemeProvider>;
};

export default App;
