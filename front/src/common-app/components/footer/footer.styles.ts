import { css } from 'emotion';
import { theme } from 'core/theme';

export const footer = css`
  grid-area: foot;
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  min-width: 320px;
  padding: 10% 0 0;

  .imgFooter {
    max-width: 140px;
    padding: 2% 0;
    align-self: center;

    ${theme.breakpoints.down('sm')} {
      max-width: 80px;
    }
  }

  .menuFooter {
    list-style: none;
    font-size: 0.8rem;
    display: flex;
    width: 100%;
    justify-content: center;
    align-self: center;
    padding: 0;

    ${theme.breakpoints.down('sm')} {
      font-size: 0.6rem;
    }
  }

  .itemMenuFooter {
    padding: 0 2%;
  }

  .linkMenuFooter {
    text-decoration: none;
    color: ${theme.palette.text.disabled};
  }

  .copyFooter {
    justify-self: flex-end;
    font-size: 0.6rem;
    color: ${theme.palette.text.disabled};
    padding: 2%;
    align-self: flex-end;

    ${theme.breakpoints.down('sm')} {
      font-size: 0.4rem;
    }
  }
`;
