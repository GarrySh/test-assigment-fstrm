import React from 'react';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

class Sidebar extends React.Component {
  handleDrawerToggle() {
    // setMobileOpen(!mobileOpen);
  }

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <h1>Settings</h1>
      </main>
    );
  }
}

export default withStyles(styles)(Sidebar);
