import { css } from 'emotion';
import { theme } from 'core/theme';

export const logoContainer = css`
  display: flex;
  flex-flow: column;
`;

export const logo = css`
  width: 100%;
  max-width: 130px;
  margin: 0 auto;
  display: block;

  /* ${theme.breakpoints.down('md')} {
    max-width: 120px;
  } */
  ${theme.breakpoints.down('sm')} {
    max-width: 80px;
  }
`;

export const title = css`
  text-shadow: 0px 5px 5px rgba(0, 81, 111, 1);
  font-weight: 500;
  padding: 1% 0;
  /* ${theme.breakpoints.down('md')} {
    font-size: 2rem;
  } */
  ${theme.breakpoints.down('sm')} {
    font-size: 1.5rem;
  }
`;
