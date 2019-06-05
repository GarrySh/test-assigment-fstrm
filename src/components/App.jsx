import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import Layout from './Layout';
import AboutUs from './AboutUs';
import News from './News';
import Settings from './Settings';
import Help from './Help';
import Article from './Article';
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
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/articles/1" />} />
            <Route path="/articles/:id" component={News} />
            <Route path="/article/:id" component={Article} />
            <Route path="/about" component={AboutUs} />
            <Route path="/help" component={Help} />
            <Route path="/settings" component={Settings} />
            <Route render={() => <h1>Not found</h1>} />
          </Switch>
        </Layout>
      </ThemeProvider>
    </Router>
  );
};

export default connect(mapStateToProps)(App);
