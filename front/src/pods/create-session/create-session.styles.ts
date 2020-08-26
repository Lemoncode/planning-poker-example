import { css } from 'emotion';
import { theme } from 'core/theme';

export const container = css`
  width: 100%;
  padding: 6%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-content: center;
  ${theme.breakpoints.down('sm')} {
    margin-top: 10%;
  }
`;

export const title = css`
  text-align: center;
  font-weight: 300;
  ${theme.breakpoints.down('sm')} {
    font-size: 1.4rem;
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
`;

export const formItem = css`
  max-width: 300px;
  width: 100%;
  margin: 2% 0;
`;

export const textField = css`
  border-bottom: 1px solid ${theme.palette.text.secondary};
`;
