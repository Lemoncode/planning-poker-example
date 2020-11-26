import { css } from 'emotion';
import { theme } from 'core/theme';

const color = theme.palette.varColors;

export const subtitle = css`
  font-weight: 300;
  color: ${color.grey1};
  font-size: 0.9rem;
  line-height: 1.3rem;
  margin: 0;
`;

export const subtitle2 = css`
  font-size: 1.2rem;
  font-weight: 500;
`;

export const button = css`
  &:hover {
    background: ${color.greenLight};
    color: ${color.brownLemon};
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

export const container = css`
  display: flex;
  flex-flow: column;
`;

export const contanierLabels = css`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  width: auto;
  list-style: none;
  padding: 0;
  margin: 0;

  ${theme.breakpoints.up('sm')} {
    flex-flow: row;
  }
  @media (min-width: 430px) and (max-width: 599px) {
    margin: 3% 0;
  }
`;

export const contanierLabelShowVote = css`
  ${contanierLabels}
  justify-content: center;
`;

export const label = css`
  cursor: pointer;
  min-height: 274px;
  color: red;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-flow: column;
  background-image: url('./assets/label-white.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% auto;
  color: ${theme.palette.varColors.brownLemon};

  :hover {
    background-image: url('./assets/label-red.png');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% auto;
    color: ${theme.palette.varColors.grey1};
    transition: background-image 0.2s ease-in;
    -moz-transition: background-image 0.2s ease-in;

    @media (min-width: 430px) and (max-width: 599px) {
      background-size: 85% auto;
    }
  }

  @media (min-width: 430px) and (max-width: 599px) {
    background-size: 85% auto;
  }

  div,
  span {
    padding: 0;
    margin: 0;
    width: 100%;
    text-align: center;
    font-family: ${theme.typography.fontFamily};
    text-shadow: 1px 1px 3px grey;
  }
  div {
    font-size: 2.5rem;
    font-weight: 500;
    letter-spacing: 0.08rem;
    position: relative;
    top: 1%;

    ${theme.breakpoints.down('md')} {
      font-size: 2.1rem;
    }
    ${theme.breakpoints.up('lg')} {
      font-size: 1.7rem;
    }
    ${theme.breakpoints.up('xl')} {
      font-size: 1.9rem;
    }
  }
  span {
    font-size: 1.7rem;
    font-weight: 100;
    letter-spacing: 0.32rem;
    position: relative;
    margin-top: -0.5rem;
    left: 1%;
    ${theme.breakpoints.down('md')} {
      font-size: 1.5rem;
    }
    ${theme.breakpoints.up('lg')} {
      font-size: 1.1rem;
    }
    ${theme.breakpoints.up('xl')} {
      font-size: 1.3rem;
    }
  }
`;

export const activeLabel = css`
  ${label}
  width: 100%;
  background-image: url('./assets/label-red.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% auto;
  color: ${theme.palette.varColors.grey1};
`;

export const showLabelVote = css`
  ${activeLabel}

  width: 100%;
  cursor: default;
  margin: 3% 0 5%;

  @media (min-width: 430px) and (max-width: 700px) {
    background-size: 85% auto;
  }
`;

export const radioButton = css`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

const voteListItemActive = css`
  transform: scale(1.1);
  transition: transform 100ms linear;
  margin: 0 2%;
`;

export const voteListItem = (active: boolean): string => css`
  width: 30%;
  min-height: 220px;
  max-width: 128px;
  ${active ? voteListItemActive : ``}
`;
