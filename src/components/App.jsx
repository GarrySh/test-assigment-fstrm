import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import Layout from './Layout';
import AboutUs from './AboutUs';
import Articles from './Articles';
import Settings from './Settings';
import Help from './Help';
import getTheme from '../themes';

const mapStateToProps = state => {
  return {
    fontSize: state.UIState.fontSize,
    currentTheme: state.UIState.theme,
  };
};

const App = ({ fontSize, currentTheme }) => {
  const theme = getTheme(currentTheme, fontSize);
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Layout>
          <Route exact path="/" component={Articles} />
          <Route path="/articles/:id" component={Articles} />
          <Route path="/about" component={AboutUs} />
          <Route path="/help" component={Help} />
          <Route path="/settings" component={Settings} />
        </Layout>
      </ThemeProvider>
    </Router>
  );
};

export default connect(mapStateToProps)(App);
