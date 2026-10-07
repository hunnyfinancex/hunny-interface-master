import { black, green, grey, red, white, purple, yellow, dark } from './colors';

const theme = {
  borderRadius: 12,
  breakpoints: {
    mobile: 400,
  },
  inputBackground: 'rgb(25 33 45)',
  color: {
    black,
    dark,
    red,
    grey,
    purple,
    green,
    yellow,
    primary: {
      light: red[200],
      main: red[500],
    },
    secondary: {
      main: green[500],
    },
    white,
  },
  siteWidth: 900,
  spacing: {
    1: 4,
    2: 8,
    3: 16,
    4: 24,
    5: 32,
    6: 48,
    7: 64,
  },
  topBarSize: 72,
  botBarSize: 56,
};

export default theme;
