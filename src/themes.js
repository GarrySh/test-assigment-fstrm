import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

const themes = {
  primary: {
    type: 'dark',
    palette: {
      primary: green,
    },
    status: {
      danger: 'orange',
    },
  },
  secondary: {
    palette: {
      primary: red,
    },
    status: {
      danger: 'orange',
    },
  }
}

const getTheme = (currentTheme, fontSize) => {
  const theme = createMuiTheme({
    spacing: factor => `${1 * factor}rem`,
    typography: {
      fontSize,
    },
    ...themes[currentTheme],
  });
  return responsiveFontSizes(theme);
}

export default getTheme;
