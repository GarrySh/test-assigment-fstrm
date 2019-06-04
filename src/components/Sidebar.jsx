import React from 'react';
import { withStyles } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import HelpIcon from '@material-ui/icons/Help';
import Settings from '@material-ui/icons/Settings';
import Computer from '@material-ui/icons/Computer';
import { Link as RouterLink } from 'react-router-dom';
import { sidebarWidth } from '../constants';

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: sidebarWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: sidebarWidth,
  },
});

const CustomItem = props => {
  const { to, text, children } = props;
  return (
    <ListItem button component={RouterLink} to={to}>
      <ListItemIcon>{children}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
};

class Sidebar extends React.Component {
  renderDrawer() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <CustomItem text="Главная" to="/">
            <Computer />
          </CustomItem>
          <CustomItem text="Помощь" to="/help">
            <HelpIcon />
          </CustomItem>
          <CustomItem text="О нас" to="/about">
            <MailIcon />
          </CustomItem>
        </List>
        <Divider />
        <List>
          <CustomItem text="Настройки" to="/settings">
            <Settings />
          </CustomItem>
        </List>
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            open={false} // open={mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {this.renderDrawer()}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {this.renderDrawer()}
          </Drawer>
        </Hidden>
      </nav>
    );
  }
}

export default withStyles(styles)(Sidebar);
