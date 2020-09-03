import { css } from 'emotion';
import { theme } from 'core/theme';

const color = theme.palette.varColors;

export const container = css`
  width: 100%;
  display: flex;
  flex-flow: column;
  /* grid-area: aside; */

  .subtitle {
    font-weight: 300;
    color: ${color.greenLight};
    font-size: 0.9rem;
    line-height: 1.3rem;
  }

  .table {
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
      background: rgba(47, 72, 88, 0.6);
      color: ${color.grey1};
      font-weight: 300;
    }
    .body {
      background: ${color.grey1};

      tr:nth-child(2n + 1) {
        background: rgba(149, 177, 174, 0.6);
      }
    }
  }
`;
