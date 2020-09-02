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
  /* border: 1px solid yellowgreen; */
  font-size: 1rem;

  .subtitle {
    font-weight: 300;
    color: ${color.grey1};
    font-size: 0.9rem;
    line-height: 1.3rem;
    margin: 0;
  }

  .container-component {
    border: 1px solid red;
  }

  .story {
    color: ${theme.palette.varColors.grey1};
    border: 1px dashed ${theme.palette.varColors.greenDark};
    background: rgba(36, 36, 21, 0.3);
    border-radius: 3px;
    padding: 3%;
    font-weight: 100;
    font-size: 0.9rem;
    margin: 1% 0;
  }

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
      border: 1px solid red;
    }
  }
`;

export const component = css``;

export const table = css`
  ${theme.breakpoints.up('lg')} {
    grid-area: right;
  }
`;
