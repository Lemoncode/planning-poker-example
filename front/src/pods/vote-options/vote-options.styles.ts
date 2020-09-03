import { css } from 'emotion';
import { theme } from 'core/theme';

const color = theme.palette.varColors;

export const label = css`
  width: 10%;
  height: 120px;
  display: block;
  border: 1px solid red;
  background: url(./src/assets/xxl-white.png) no-repeat center center;
  background-size: cover;
  cursor: pointer;

  &:hover {
    background: url(./src/assets/xxl-red.png) no-repeat center center;
    background-size: cover;
    width: 20%;
  }
`;
