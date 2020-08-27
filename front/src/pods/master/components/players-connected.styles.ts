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

export const table = css`
  width: 100%;
  border-radius: 5px;

  .cell {
    padding: 2%;
  }

  .head {
    background: ${color.blue};
    color: ${color.grey1};
  }
  .body {
    background: ${color.grey1};
    color: ${color.brownLemon};
  }
`;
