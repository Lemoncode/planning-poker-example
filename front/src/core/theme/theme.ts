import merge from 'lodash.merge';
import { createMuiTheme } from '@material-ui/core/styles';
import { Theme } from './theme.vm';

const defaultTheme = createMuiTheme();

export const theme: Theme = merge(defaultTheme, {
  palette: {
    primary: {
      main: '#008c86',
      light: '#95b1ae',
      dark: '#334b49',
    },
    secondary: {
      main: '#d9d900',
      light: '#f2fedc',
      dark: '#a7ab00',
    },
    text: {
      primary: '#e6e6e6',
      secondary: '#b3b3b3',
      disabled: '#a5a5a5',
      hint: '#a5a5a5',
    },
    common: {
      black: '#d242415',
      white: '#ffffff',
    },
    info: {
      main: '#2f4858',
    },
    table: {
      header: {
        main: '#2f4858',
        contrastText: '#f2f2f2',
      },
      row: {
        main: '#e6e6e6',
        contrastText: '#242415',
      },
    },
  },
  typography: {},
} as Theme);
