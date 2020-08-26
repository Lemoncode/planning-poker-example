import { css } from 'emotion';
import { theme } from 'core/theme';

export const footer = css`
  grid-area: foot;
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  min-width: 320px;
`;

export const imgFooter = css`
  max-width: 140px;
  padding: 2% 0;
  align-self: center;

  ${theme.breakpoints.down('sm')} {
    max-width: 80px;
  }
`;

export const menuFooter = css`
  list-style: none;
  font-size: 0.8rem;
  display: flex;
  width: 100%;
  justify-content: center;
  align-self: center;
  padding: 0;

  ${theme.breakpoints.down('sm')} {
    font-size: 0.6rem;
  }
`;

export const itemMenuFooter = css`
  padding: 0 2%;
`;

export const linkMenuFooter = css`
  text-decoration: none;
  color: ${theme.palette.text.disabled};
`;

export const copyFooter = css`
  justify-self: flex-end;
  font-size: 0.6rem;
  color: ${theme.palette.text.disabled};
  padding: 2%;
  align-self: flex-end;

  ${theme.breakpoints.down('sm')} {
    font-size: 0.4rem;
  }
`;
