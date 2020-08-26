import { css } from 'emotion';
import { theme } from 'core/theme';

export const container = css`
  grid-area: main;
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-content: center;
`;

export const title = css`
  text-align: center;
  font-weight: 300;
  ${theme.breakpoints.down('sm')} {
    font-size: 1.3rem;
  }
`;

export const formContainer = css`
  display: flex;
  flex-flow: column;
  width: 100%;
  justify-content: center;
  align-content: center;
  padding: 6%;
  align-items: center;
  ${theme.breakpoints.up('lg')} {
    padding: 2%;
  }
`;

export const formItem = css`
  max-width: 300px;
  width: 100%;
  margin: 2% 0;
  ${theme.breakpoints.up('lg')} {
    margin: 1% 0;
  }
`;

export const textField = css`
  border-bottom: 1px solid ${theme.palette.text.secondary};
`;
export const button = css`
  :hover {
    background: ${theme.palette.primary.light};
  }
`;
