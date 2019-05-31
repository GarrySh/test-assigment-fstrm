import React from 'react';
import { withStyles } from '@material-ui/styles';

import ApplicationBar from './ApplicationBar';
import Sidebar from './Sidebar';

const styles = () => ({
  root: {
    display: 'flex',
  },
});

const Layout = props => {
  const { classes, children } = props;
  return (
    <div className={classes.root}>
      <ApplicationBar />
      <Sidebar />
      {children}
    </div>
  );
};

export default withStyles(styles)(Layout);
