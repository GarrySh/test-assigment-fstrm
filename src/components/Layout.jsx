import React from 'react';
import { withStyles } from '@material-ui/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ApplicationBar from './ApplicationBar';
import Sidebar from './Sidebar';
import Main from './Main';
import AboutUs from './AboutUs';
import PageNotFound from './PageNotFound';

const styles = () => ({
  root: {
    display: 'flex',
  },
});

const Layout = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Router>
        <Switch>
          <>
            <ApplicationBar />
            <Sidebar />
            <Route path="/" exact component={Main} />
            <Route path="/about" component={AboutUs} />
          </>
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
};

export default withStyles(styles)(Layout);
