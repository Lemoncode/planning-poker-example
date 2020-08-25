import { css } from 'emotion';
import { theme } from 'core/theme';

export const background = css`
  background: url(./src/assets/fondo-movil.jpg) no-repeat center center;
  background-size: cover;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  margin: 0;
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
  grid-template-columns: 1fr;
  align-items: center;
  margin-top: 2rem;
  position: relative;
  justify-items: center;
  min-width: 320px;
`;
