import { css } from 'emotion';
import { theme } from 'core/theme';

const color = theme.palette.varColors;

export const container = css`
  display: flex;
  flex-flow: column;

  .title {
    color: red;
  }

  .container-labels {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    width: auto;
    margin: 5% 0;

    ${theme.breakpoints.up('md')} {
      flex-flow: row;
    }

    .label {
      cursor: pointer;
      width: 30%;
      height: auto;
      margin: 3% 0;

      ${theme.breakpoints.up('md')} {
        width: 100%;
      }
    }
    .xxl {
      content: url('./src/assets/xxl-white.png');
      :hover {
        content: url('./src/assets/xxl-red.png');
      }
    }
    .xl {
      content: url('./src/assets/xl-white.png');
      :hover {
        content: url('./src/assets/xl-red.png');
      }
    }
    .l {
      content: url('./src/assets/l-white.png');
      :hover {
        content: url('./src/assets/l-red.png');
      }
    }
    .m {
      content: url('./src/assets/m-white.png');
      :hover {
        content: url('./src/assets/m-red.png');
      }
    }
    .s {
      content: url('./src/assets/s-white.png');
      :hover {
        content: url('./src/assets/s-red.png');
      }
    }
    .xs {
      content: url('./src/assets/xs-white.png');
      :hover {
        content: url('./src/assets/xs-red.png');
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
