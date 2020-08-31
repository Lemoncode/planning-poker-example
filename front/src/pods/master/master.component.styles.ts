import { css } from 'emotion';
import { theme } from 'core/theme';

const color = theme.palette.varColors;

export const container = css`
  grid-area: main;
  width: 100%;
  padding: 7%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-content: center;

  ${theme.breakpoints.up('lg')} {
    display: grid;
    grid-template-areas: 'left right';
    grid-auto-flow: row;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
    grid-gap: 5%;
  }
  .left-container {
    ${theme.breakpoints.up('lg')} {
      grid-area: left;
      align-self: end;
    }
  }
`;

export const component = css``;

export const table = css`
  ${theme.breakpoints.up('lg')} {
    grid-area: right;
  }
`;
