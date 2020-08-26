import merge from 'lodash.merge';
import { createMuiTheme } from '@material-ui/core/styles';
import { Theme } from './theme.vm';

const defaultTheme = createMuiTheme();

const varColors = {
  yellowLemon: '#d9d900',
  yellowLemonLight: '#f2fedc',
  yellowLemonDark: '#a7ab00',
  brownLemon: '#242415',
  green: '#008c86',
  greenDark: '#334b49',
  greenLight: '#95b1ae',
  blue: '#2f4858',
  grey1: '#e6e6e6',
  grey2: '#b3b3b3',
  grey3: '#a5a5a5',
};

export const theme: Theme = merge(defaultTheme, {
  palette: {
    primary: {
      main: varColors.green,
      light: varColors.greenLight,
      dark: varColors.greenDark,
    },
    secondary: {
      main: varColors.yellowLemon,
      light: varColors.yellowLemonLight,
      dark: varColors.yellowLemonDark,
    },
    text: {
      primary: varColors.grey1,
      secondary: varColors.grey2,
      disabled: varColors.grey3,
    },
    common: {
      black: '#000000',
      white: '#ffffff',
    },
    info: {
      main: varColors.blue,
    },
  },
  typography: {
    h4: {
      color: varColors.brownLemon,
    },
  },
  breakpoints: {
    values: {
      md: 667,
    },
  },
} as Theme);
