import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AppsIcon from '@material-ui/icons/Apps';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Link from '@material-ui/core/Link';
import Popover from '@material-ui/core/Popover';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import SmallAppIcon from './smallAppIcon.jsx';


import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(3)
    }
}));

import { useTranslation } from 'react-i18next';
import '../i18n/i18n.js';


export default function MenuAppBar(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const { t, i18n } = useTranslation();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [appAnchorEl, setAppAnchorEl] = React.useState(null);
    const appHandleClick = (event) => {
        setAppAnchorEl(event.currentTarget);
    };

    const appHandleClose = () => {
        setAppAnchorEl(null);
    };
    const appOpen = Boolean(appAnchorEl);
    const id = appOpen ? 'simple-popover' : undefined;



    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar variant="dense">
                    <Tooltip title="Apps">
                        <>
                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={appHandleClick}>
                                <AppsIcon />
                            </IconButton>
                            <Popover
                                id={id}
                                open={appOpen}
                                anchorEl={appAnchorEl}
                                onClose={appHandleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                            >
                                <Paper className={classes.paper} elevation={1}>
                                    <Grid container className={classes.root} spacing={1}>
                                        <Grid item xs={12}>
                                            <Grid container justify="flex-start" spacing={1}>
                                                {window.props.settings.apps.map((value) => (
                                                    <Grid item key={value.name} xs={2}>
                                                        <SmallAppIcon name={value.name} link={value.link}  />
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </Grid>
                                    </Grid>


                                </Paper>

                            </Popover>
                        </>
                    </Tooltip>
                    <Typography variant="h6" className={classes.title}>
                        Impact
                </Typography>
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem disabled onClick={handleClose}> {t('connected_as')} {window.props.settings.username}</MenuItem>
                            <Divider />
                            <Link href={window.props.settings.links.dashboard} color="inherit" underline="none" >
                                <MenuItem onClick={handleClose}>
                                    {t('home')}
                                </MenuItem>
                            </Link>
                            <Link href={window.props.settings.links.profile} color="inherit" underline="none" >
                                <MenuItem onClick={handleClose}>
                                    {t('profile')}
                                </MenuItem>
                            </Link>
                            <Link href={window.props.settings.links.logout} color="inherit" underline="none" >
                                <MenuItem onClick={handleClose}>
                                    {t('logout')}
                                </MenuItem>
                            </Link>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
