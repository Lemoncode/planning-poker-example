import { css } from 'emotion';
import { theme } from 'core/theme';

export const footer = css`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  width: 100%;
  position: fixed;
  bottom: 0;
  min-width: 320px;
`;

export const imgFooter = css`
  max-width: 160px;
  padding: 2% 0;

  /* ${theme.breakpoints.down('md')} {
    max-width: 100px;
  } */
  ${theme.breakpoints.down('sm')} {
    max-width: 90px;
  }
`;

export const menuFooter = css`
  list-style: none;
  font-size: 0.8rem;
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 2% 0;

  /* ${theme.breakpoints.down('md')} {
    font-size: 0.7rem;
  } */
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

  /* ${theme.breakpoints.down('md')} {
    font-size: 0.5rem;
  } */
  ${theme.breakpoints.down('sm')} {
    font-size: 0.4rem;
  }
`;
