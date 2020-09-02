import { css } from 'emotion';
import { theme } from 'core/theme';

const color = theme.palette.varColors;

export const container = css`
  display: flex;
  flex-flow: column;
  padding: 5% 0;

  .container-labels {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    width: auto;
    margin: 0;

    ${theme.breakpoints.up('md')} {
      flex-flow: row;
    }

    .label {
      cursor: pointer;
      width: 30%;
      min-height: 220px;
      max-width: 128px;
      margin: 3% 0 0;
      color: red;
      display: flex;
      justify-content: center;
      align-content: center;
      flex-flow: column;
      padding: 0;
      background-image: url('./src/assets/label-white.png');
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% auto;
      color: ${theme.palette.varColors.brownLemon};

      :hover {
        background-image: url('./src/assets/label-red.png');
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% auto;
        color: ${theme.palette.varColors.grey1};
        transition: background-image 0.2s ease-in;
        -moz-transition: background-image 0.2s ease-in;
      }

      ${theme.breakpoints.up('md')} {
        /* width: 100%; */

        min-height: 274px;
      }

      h1,
      h2 {
        padding: 0;
        margin: 0;
        width: 100%;
        text-align: center;
        font-family: ${theme.typography.fontFamily};
        text-shadow: 1px 1px 3px grey;
      }
      h1 {
        font-size: 2.5rem;
        font-weight: 500;
        letter-spacing: 0.08rem;
        position: relative;
        top: 1%;

        ${theme.breakpoints.down('md')} {
          font-size: 2.1rem;
        }
        ${theme.breakpoints.up('lg')} {
          font-size: 1.9rem;
        }
      }
      h2 {
        font-size: 1.7rem;
        font-weight: 100;
        letter-spacing: 0.32rem;
        position: relative;
        top: -2%;
        left: 1%;
        ${theme.breakpoints.down('md')} {
          font-size: 1.5rem;
        }
        ${theme.breakpoints.up('lg')} {
          font-size: 1.3rem;
        }
      }
    }
  }

  .active-label {
    cursor: pointer;
    width: 30%;
    min-height: 220px;
    max-width: 128px;
    margin: 3% 0 0;
    color: red;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-flow: column;
    padding: 0;
    background-image: url('./src/assets/label-red.png');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% auto;
    color: ${theme.palette.varColors.grey1};

    ${theme.breakpoints.up('md')} {
      /* width: 100%; */

      min-height: 274px;
    }

    h1,
    h2 {
      padding: 0;
      margin: 0;
      width: 100%;
      text-align: center;
      font-family: ${theme.typography.fontFamily};
      text-shadow: 1px 1px 3px grey;
    }
    h1 {
      font-size: 2.5rem;
      font-weight: 500;
      letter-spacing: 0.08rem;
      position: relative;
      top: 1%;

      ${theme.breakpoints.down('md')} {
        font-size: 2.1rem;
      }
      ${theme.breakpoints.up('lg')} {
        font-size: 1.9rem;
      }
    }
    h2 {
      font-size: 1.7rem;
      font-weight: 100;
      letter-spacing: 0.32rem;
      position: relative;
      top: -2%;
      left: 1%;
      ${theme.breakpoints.down('md')} {
        font-size: 1.5rem;
      }
      ${theme.breakpoints.up('lg')} {
        font-size: 1.3rem;
      }
    }
  }

  .bottom-container {
    display: flex;
    flex-flow: column;
    justify-content: center;
    width: 100%;

    .bottom {
      width: 100%;
      margin: 2% auto;

      :hover {
        background: ${theme.palette.primary.light};
      }

      ${theme.breakpoints.up('md')} {
        width: 75%;
      }
    }
  }
`;
