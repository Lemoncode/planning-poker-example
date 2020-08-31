import { css } from 'emotion';
import { theme } from 'core/theme';

const color = theme.palette.varColors;

export const urlContainer = css`
  display: flex;
  flex-flow: column;
  padding: 2% 0;

  ${theme.breakpoints.up('lg')} {
    grid-area: left;
    align-self: flex-start;
  }

  .subtitle {
    font-weight: 300;
    color: ${color.grey1};
    padding-top: 3%;
    font-size: 0.9rem;
    line-height: 1.3rem;
    ${theme.breakpoints.up('lg')} {
      padding: 0 0 3%;
    }
  }

  .url {
    display: flex;
    justify-content: space-between;
    align-content: center;
    padding: 3% 0;
  }

  input {
    width: 80%;
    border: 1px solid ${color.grey3};
    padding: 0 2%;
    border-radius: 3px;
    background: white;
  }
  .copyIcon {
    margin-right: 3%;
    color: ${color.grey1};
    cursor: pointer;
    :hover {
      color: ${color.grey2};
    }
  }
`;
