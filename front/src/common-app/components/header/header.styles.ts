import { css } from 'emotion';
import { theme } from 'core/theme';

export const logoContainer = css`
  grid-area: head;
  display: flex;
  flex-flow: column;
`;

export const logo = css`
  width: 100%;
  max-width: 130px;
  margin: 0 auto;
  display: block;

  ${theme.breakpoints.down('sm')} {
    max-width: 80px;
  }
`;

export const title = css`
  text-shadow: 0px 5px 5px rgba(0, 81, 111, 1);
  font-weight: 500;
  padding: 1% 0;
  text-align: center;

  ${theme.breakpoints.down('sm')} {
    font-size: 1.5rem;
  }
`;
