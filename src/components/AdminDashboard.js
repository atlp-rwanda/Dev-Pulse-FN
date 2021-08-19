import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import Header from './shared/Header';
import { People } from '@material-ui/icons';
import { ListAlt } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: '18vw',
    minWidth: 200,
    zIndex: 0,
  },
  drawerContainer: {
    overflow: 'auto',
  },
}));

const sideMenus = [
  {
    text: 'Allowed Emails',
    icon: <MailIcon />,
    link: '/admin/emails',
  },
  {
    text: 'Cohorts',
    icon: <People />,
    link: '/admin/cohorts',
  },
  {
    text: 'Sessions',
    icon: <ListAlt />,
    link: '/admin/sessions',
  },
];

export default function AdminDashboard(props) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position='absolute' className={classes.appBar}>
          <Header />
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant='permanent'
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <List>
              {sideMenus.map((menu, index) => (
                <ListItem
                  button
                  component={Link}
                  key={menu.text}
                  to={menu.link}
                >
                  <ListItemIcon>{menu.icon}</ListItemIcon>
                  <ListItemText primary={menu.text} />
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
      </div>
    </>
  );
}
