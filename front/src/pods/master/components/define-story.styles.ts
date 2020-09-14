import { css } from 'emotion';
import { theme } from 'core/theme';

const color = theme.palette.varColors;

export const container = css`
  width: 100%;
  display: flex;
  flex-flow: column;
`;

export const subtitle = css`
  font-weight: 300;
  color: ${color.greenLight};
  font-size: 0.9rem;
  line-height: 1.3rem;
  margin: 0;
`;

export const textArea = css`
  line-height: 1.3rem;
  border: 1px solid ${color.grey3};
  padding: 1%;
  margin: 3% 0 5%;
  border-radius: 3px;
  width: 100%;
  background: rgba(36, 36, 21, 0.3);
  & > * {
    font-family: ${theme.typography.fontFamily};
    font-weight: 100;
    color: ${color.grey1};
    font-size: 0.9rem;
  }
`;

export const button = css`
  width: 100%;
  align-self: flex-end;
  &:hover {
    background: ${color.greenLight};
    color: ${color.brownLemon};
  }
`;
