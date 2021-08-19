import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Header from './shared/Header';

// const AdminDashboard = () => (
//   <div className="container">
//     <p className="tableHeader">I'm the admin</p>
//     <Link to="/list" className="btn">Edit My List</Link>
//     {/* <Table /> */}
//   </div>
// );

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    // border: '2px solid red',
    // marginTop: '200px',
    // paddingTop: '200px',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    // marginTop: '200px',
    border: '2px solid green',
  },
  drawerPaper: {
    width: drawerWidth,
    // border: '2px solid orange',
    // marginTop: '200px',
    zIndex: 0,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const sideMenus = [
  {
    text: 'Allowed Emails',
    icon: <MailIcon />,
    link: '/emails',
  },
  {
    text: 'Authorized Emails',
    icon: <MailIcon />,
    link: '/emails',
  }];

export default function AdminDashboard(props) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={classes.appBar}>
          <Header />
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <List>
              {sideMenus.map((menu, index) => (
                <ListItem button key={menu.text} onClick={() => props.history.push("/emails")}>
                  <ListItemIcon>{menu.icon}</ListItemIcon>
                  <ListItemText primary={menu.text} />
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
        <main className={classes.content}>
          {/* <Toolbar /> */}
          <Typography variant="h5"> Main admin dashboard page</Typography>
        </main>
      </div>
    </>
  );
}

// export default AdminDashboard;
