import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/styles';

import { sidebarWidth } from '../constants';

const styles = theme => ({
  appBar: {
    marginLeft: sidebarWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${sidebarWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
});

class ApplicationBar extends React.Component {

  handleDrawerToggle() {
    // setMobileOpen(!mobileOpen);
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              edge="start"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Responsive drawer
            </Typography>
          </Toolbar>
        </AppBar>
      </>
    );
  }
}

export default withStyles(styles)(ApplicationBar);
