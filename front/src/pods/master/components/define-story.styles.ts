import { css } from 'emotion';
import { theme } from 'core/theme';

const color = theme.palette.varColors;

export const container = css`
  padding: 3% 0;
  width: 100%;
  display: flex;
  flex-flow: column;
`;

export const subtitle = css`
  font-weight: 300;
  color: ${color.grey1};
  padding-top: 3%;
  font-size: 0.9rem;
  line-height: 1.3rem;

  ${theme.breakpoints.down('sm')} {
  }
`;

export const textArea = css`
  font-size: 0.9rem;
  line-height: 1.3rem;
  border: 1px solid ${color.grey3};
  padding: 1%;
  margin-top: 2%;
  border-radius: 3px;
  font-family: ${theme.typography.fontFamily};
  width: 100%;
`;

export const button = css`
  width: 100%;
  align-self: flex-end;
  margin: 3% 0;
`;
