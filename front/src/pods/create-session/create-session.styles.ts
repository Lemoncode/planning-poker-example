import { css } from 'emotion';
import { theme } from 'core/theme';

const color = theme.palette.varColors;

export const container = css`
  grid-area: main;
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-content: center;
  margin-top: 5%;
  padding: 3%;

  .title {
    text-align: center;
    font-weight: 300;
    color: ${color.grey1};
    ${theme.breakpoints.down('sm')} {
      font-size: 1.3rem;
    }
  }

  .formContainer {
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
  }

  .formItem {
    max-width: 300px;
    width: 100%;
    margin: 2% 0;
    ${theme.breakpoints.up('lg')} {
      margin: 1% 0;
    }
  }

  .textField {
    border-bottom: 1px solid ${color.grey2};

    input {
      color: ${color.grey1};
    }
  }
`;

export const button = css`
  :hover {
    background: ${color.greenLight};
    color: ${color.brownLemon};
  }
`;
