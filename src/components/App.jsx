import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import Layout from './Layout';
import AboutUs from './AboutUs';
import Main from './Main';
import Settings from './Settings';
import Help from './Help';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Route exact path="/" component={Main} />
          <Route path="/about" component={AboutUs} />
          <Route path="/help" component={Help} />
          <Route path="/settings" component={Settings} />
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
