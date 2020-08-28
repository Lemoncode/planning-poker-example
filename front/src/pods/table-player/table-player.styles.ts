import { css } from 'emotion';
import { theme } from 'core/theme';

const color = theme.palette.varColors;

export const container = css`
  padding: 3% 0;
  width: 100%;
  display: flex;
  flex-flow: column;
  grid-area: aside;
`;

export const subtitle = css`
  font-weight: 300;
  color: ${color.grey1};
  padding-top: 3%;
  font-size: 0.9rem;
  line-height: 1.3rem;
`;

export const table = css`
  width: 100%;
  margin-top: 3%;
  border-radius: 5px;

  ${theme.breakpoints.down('sm')} {
    border-radius: 3px;
  }

  .cell {
    padding: 2%;
  }

  .head {
    background: ${color.blue};
    color: ${color.grey1};
  }
  .body {
    background: white;
    color: ${color.brownLemon};
    tr:nth-child(2n + 1) {
      background: ${color.grey1};
    }
  }
`;
