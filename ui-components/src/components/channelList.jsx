import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListIcon from '@material-ui/icons/List';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Toolbar from '@material-ui/core/Toolbar';
import { useSnackbar } from 'notistack';


import Icon from '@material-ui/core/Icon';
import { Link } from '@material-ui/core';
const drawerWidth = "240px";
const smallDrawerWidth = "190px";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('md')]: {
          width: drawerWidth,
          flexShrink: 0,
        },
        
    },
    menuButton: {
        marginRight: theme.spacing(1),
        backgroundColor: "transparent",
        position: "fixed",
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
    },
    drawerPaper: {
        zIndex: theme.zIndex.appBar - 1,
        width: drawerWidth,
        // height: 'calc(100% - 64px)', 
        // top: 64,
        backgroundColor: "transparent",
        border: "none",

        [theme.breakpoints.down('sm')]: {
          backgroundColor: "white",
          // width: smallDrawerWidth,
        },
        [theme.breakpoints.down("md")]: {
          width: smallDrawerWidth,
        }

        // backgroundColor: "transparent",
    },
    listItem: {
      width: '100%',
        borderTopRightRadius: "32px",
        borderBottomRightRadius: "32px",
        // padding: theme.spacing(0)
    },
    toolbar: theme.mixins.toolbar,
}));
  
export default function ChannelList(props) {
    const { windows } = props;
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    
  
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  
    const drawer = (
            <>
            <Toolbar />
            <div>
              <List>
                {props.channels.map((channel, index) => (
                  <Link href={channel.pk} underline="none" color="inherit" key={channel.name}>
                    <ListItem button  className={classes.listItem} selected={index===window.props.selected}>
                      <ListItemIcon>
                          <ChatBubbleIcon />
                      </ListItemIcon>
                      <ListItemText primary={channel.name} />
                    </ListItem>
                  </Link>
                ))}
              </List>
            </div>
            </>
    );
    return (
        <div className={classes.root}>

            <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <ListIcon />
          </IconButton>
            {/* <div className={classes.toolbar} /> */}
                  <nav className={classes.drawer} aria-label="mailbox folders">
                        <Hidden mdUp implementation="css">
                            <Drawer
                                variant="temporary"
                                anchor='left'
                                open={mobileOpen}
                                onClose={handleDrawerToggle}
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                // style={{
                                //   backgroundColor: "white"
                                // }}
                                ModalProps={{
                                    keepMounted: true, // Better open performance on mobile.
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                        <Hidden smDown implementation="css">
                            <Drawer
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                variant="permanent"
                                open
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                </nav>
      </div>
    );
}


