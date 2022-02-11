import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#a77aff',
    },
    secondary: {
      main: '#0bffe4',
    },
    text: {
      primary: 'rgba(255,255,255,0.87)',
      secondary: 'rgba(255,255,255,0.54)',
      disabled: 'rgba(255,255,255,0.38)',
    },
    background: {
      default: '#003052',
      paper: '#01579b',
    },
    error: {
      main: '#ff2316',
    },
  },
});