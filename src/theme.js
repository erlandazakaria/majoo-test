import { createMuiTheme } from '@material-ui/core/styles';

let primaryPallete = {
  light: '#36cccc',
  main: '#2AA5A5',
  dark: '#1d6363',
  contrastText: '#FFFFFF'
}

let secondaryPallete = {
  light: '#C6E3F3',
  main: '#41a2d7',
  dark: '#2D7196',
  contrastText: '#FFFFFF'
}

export const theme = createMuiTheme({
  palette: {
    primary: primaryPallete,
    secondary: secondaryPallete
  },
});
