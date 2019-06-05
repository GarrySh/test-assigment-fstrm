import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import constants from '../constants';
import * as actions from '../actions';

const styles = theme => ({
  appBar: {
    marginLeft: constants.sidebarWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${constants.sidebarWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

const mapStateToProps = state => {
  return {
    isMobileSidebarOpen: state.UIState.isMobileSidebarOpen,
    title: state.pages.title,
  };
};

const actionCreators = {
  changeVisibleMobileSidebar: actions.changeVisibleMobileSidebar,
};

class ApplicationBar extends React.Component {
  handleDrawerToggle = () => {
    const { isMobileSidebarOpen, changeVisibleMobileSidebar } = this.props;
    changeVisibleMobileSidebar({ isOpen: !isMobileSidebarOpen });
  };

  render() {
    const { classes, title } = this.props;
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
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
      </>
    );
  }
}

const wStyles = withStyles(styles)(ApplicationBar);
export default connect(
  mapStateToProps,
  actionCreators
)(wStyles);
