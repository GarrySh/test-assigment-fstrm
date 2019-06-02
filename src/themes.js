import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const themes = {
  primary: {
    palette: {
      primary: purple,
      secondary: green,
    },
    status: {
      danger: 'orange',
    },
  },
  secondary: {
    palette: {
      primary: green,
      secondary: purple,
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
