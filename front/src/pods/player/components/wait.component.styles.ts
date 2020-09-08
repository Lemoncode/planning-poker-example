import { css } from 'emotion';
import { theme } from 'core/theme';

const color = theme.palette.varColors;

export const spinnerContainer = css`
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100vh;
  position: fixed;
  justify-content: center;
  align-content: center;
  background: rgba(36, 36, 21, 0.8);
  z-index: 1000;
`;

export const title = css`
  font-weight: 300;
  color: ${color.grey1};
  text-align: center;
  margin: 0;
  background: rgba(36, 36, 21, 0.3);
  border-radius: 3px;
  padding: 3%;
`;

export const titleSpinner = css`
  font-size: 2rem;
  background: none;
  ${theme.breakpoints.down('sm')} {
    font-size: 1.5rem;
  }
`;

export const spinner = css`
  width: 100%;
  margin: 5% auto;

  ${theme.breakpoints.down('sm')} {
    width: 75px !important;
    height: 75px !important;
  }
  ${theme.breakpoints.up('lg')} {
    margin: 2% auto;
  }
`;
