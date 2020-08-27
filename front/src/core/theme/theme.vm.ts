import { Theme as DefaultTheme } from '@material-ui/core/styles';
import {
  Palette as DefaultPalette,
  PaletteColor,
} from '@material-ui/core/styles/createPalette';

interface Palette extends DefaultPalette {
  varColors: {
    yellowLemon: string;
    yellowLemonLight: string;
    yellowLemonDark: string;
    brownLemon: string;
    green: string;
    greenDark: string;
    greenLight: string;
    blue: string;
    grey1: string;
    grey2: string;
    grey3: string;
  };
}

export interface Theme extends Omit<DefaultTheme, 'palette'> {
  palette: Palette;
}
