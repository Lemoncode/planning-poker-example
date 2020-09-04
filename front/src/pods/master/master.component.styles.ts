import { css } from 'emotion';
import { theme } from 'core/theme';

const color = theme.palette.varColors;

export const container = css`
  grid-area: main;
  width: 100%;
  padding: 1% 7%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-content: center;
  justify-self: center;
  font-size: 1rem;

  .title {
    font-weight: 300;
    color: ${color.grey1};
    text-align: center;
    margin: 0;
    background: rgba(36, 36, 21, 0.3);
    border-radius: 3px;
    padding: 3%;
  }

  .subtitle {
    font-weight: 300;
    color: ${color.greenLight};
    font-size: 0.9rem;
    line-height: 1.3rem;
    margin: 0;
  }

  .container-component {
    padding: 10% 0 0;
    margin: 0;
    width: 100%;
    display: block;
  }

  .story {
    color: ${color.grey1};
    border: 1px dashed ${color.yellowLemonDark};
    background: rgba(36, 36, 21, 0.3);
    border-radius: 3px;
    padding: 3%;
    font-weight: 100;
    font-size: 0.9rem;
    margin: 1% 0;
  }

  ${theme.breakpoints.up('lg')} {
    display: grid;
    grid-template-areas:
      'left right'
      'left2 right'
      'left3 right';
    grid-template-columns: 1fr 1fr;
    grid-gap: 0 13%;

    .left-container {
      grid-area: left;
      display: flex;
    }
    .right-container {
      grid-area: right;
    }
    .left-container2 {
      grid-area: left2;
      display: flex;
    }
    .right-container2 {
      grid-area: right2;
    }
    .left-container3 {
      grid-area: left3;
      display: flex;
    }
    .right-container3 {
      grid-area: right3;
    }
  }

  ${theme.breakpoints.up('xl')} {
    padding: 1% 2%;
    width: 75%;
    grid-gap: 0 20%;
  }
`;

export const button = css`
  width: 100%;
  margin: 2% auto;

  :hover {
    background: ${color.greenLight};
    color: ${color.brownLemon};
  }

  ${theme.breakpoints.up('md')} {
    width: 50%;
  }
`;

export const buttonContainer = css`
  display: flex;
  flex-flow: column;
  justify-content: center;
  width: 100%;
  & > :nth-child(n) {
    width: 100%;
    margin: 2% auto;
    ${theme.breakpoints.up('md')} {
      width: 75%;
    }
  }
`;

export const finshButton = css`
  width: 100%;
  margin: 2% auto;

  &:hover {
    background: ${color.greenLight};
    color: ${color.grey1};
  }

  ${theme.breakpoints.up('md')} {
    width: 50%;
  }
`;
