import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  colors: {
    brand: '#2A2E56',
    normalWhite: '#ffffff',
    normalBlack: '#2F3438',
    normalRed: '#E05858',
    normalPink: '#FF8585',
    normalOrange: '#FF9900',
    normalGreen: '#3BAB29',
    normalGray: '#757575',
    lightGray: '#ADADAD',
    lighterGray: '#E5E5E5',
    lighterBlue: '#F6F8FA',
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
    },
    slider: {
      wrapper: {
        small: { width: '31.2rem', height: '20.4rem' },
        large: { width: '31rem', height: '31rem' }
      }
    },
    label: {
      small: '9rem',
      normal: '11rem',
      large: '14rem'
    }
  }
});
