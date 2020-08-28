import { css } from 'emotion';
import { theme } from 'core/theme';

const color = theme.palette.varColors;

export const container = css`
  grid-area: main;
  width: 100%;
  padding: 7%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-content: center;

  ${theme.breakpoints.up('lg')} {
    display: grid;
    grid-template-areas: 'left right';
    grid-auto-flow: row;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
    grid-gap: 5%;
  }
  .left-container {
    ${theme.breakpoints.up('lg')} {
      grid-area: left;
      align-self: end;
    }
  }
`;

export const component = css``;

export const table = css`
  ${theme.breakpoints.up('lg')} {
    grid-area: right;
  }
`;

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
  }
  .copyIcon {
    margin-right: 3%;
    color: ${color.grey1};
    cursor: pointer;
  }
`;

// export const formContainer = css`
//   display: flex;
//   flex-flow: column;
//   width: 100%;
//   justify-content: center;
//   align-content: center;
//   padding: 6%;
//   align-items: center;
//   ${theme.breakpoints.up('lg')} {
//     padding: 2%;
//   }
// `;

// export const formItem = css`
//   max-width: 300px;
//   width: 100%;
//   margin: 2% 0;
//   ${theme.breakpoints.up('lg')} {
//     margin: 1% 0;
//   }
// `;

// export const textField = css`
//   border-bottom: 1px solid ${color.blue};
// `;
// export const button = css`
//   :hover {
//     background: ${theme.palette.primary.light};
//   }
// `;
