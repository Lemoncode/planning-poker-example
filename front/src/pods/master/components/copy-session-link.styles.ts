import { css } from 'emotion';
import { theme } from 'core/theme';

const color = theme.palette.varColors;

export const urlContainer = css`
  display: flex;
  flex-flow: column;

  ${theme.breakpoints.up('lg')} {
    grid-area: left;
    align-self: flex-start;
  }

  .subtitle {
    font-weight: 300;
    color: ${color.greenLight};
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
    margin-top: 3%;
  }

  input {
    width: 80%;
    border: 1px solid ${color.grey3};
    background: rgba(36, 36, 21, 0.3);
    color: ${color.grey2};
    font-weight: 100;
    padding: 2%;
    border-radius: 3px;
  }
  .copyIcon {
    margin-right: 3%;
    color: ${color.grey1};
    cursor: pointer;
    :hover {
      color: ${color.yellowLemon};
      transform: scale(1.3);
    }
  }
`;
