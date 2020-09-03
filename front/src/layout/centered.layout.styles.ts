import { css } from 'emotion';
import { theme } from 'core/theme';

const color = theme.palette.varColors;

export const background = css`
  background: url(./src/assets/fondo-movil.jpg) no-repeat center center;
  background-color: ${color.brownLemon};
  background-size: cover;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  margin: 0;
  z-index: -1000;
  ${theme.breakpoints.up('sm')} {
    background: url(./src/assets/fondo-tablet.jpg) no-repeat center center;
    background-size: cover;
  }
  ${theme.breakpoints.up('md')} {
    background: url(./src/assets/fondo-desktop.jpg) no-repeat center center;
    background-size: cover;
  }
`;

export const root = css`
  display: grid;
  grid-auto-flow: row;
  grid-template-rows: 1fr 3fr 1fr;
  grid-template-columns: 100%;
  grid-template-areas:
    'head'
    'main'
    'foot';
  height: 100vh;
  min-width: 320px;
`;
