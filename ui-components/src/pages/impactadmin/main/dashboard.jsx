import React from 'react';
import { render } from 'react-dom'

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import ToggleDarkMode from '../../../components/toogleDarkMode.jsx';
import { Divider } from '@material-ui/core';

import AppList from '../../../components/appList.jsx';
import AppBar from '../../../components/topAppBar.jsx';

import { useTranslation } from 'react-i18next';
import '../../../i18n/i18n.js';

export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    welcomeText: {
        margin: theme.spacing(1, 1, 5)
    }
}));

export default function DashboardPage(props) {
    const classes = useStyles();
    var toggleE;
    if (props.toggle) {
        toggleE = <ToggleDarkMode toggle={props.toggle} />
    }
    const { t, i18n } = useTranslation();

    return (
        <>
            <AppBar/>
            {toggleE}
            <Container maxWidth="md">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <AccountCircleIcon />
                    </Avatar>
                    <Typography component="h1" variant="h4" className={classes.welcomeText}>
                        {t('welcome')}, {window.props.settings.username}
                    </Typography>
                </div>
                <Divider />
                <Box display="flex" flexDirection="row" p={1} m={1} flexWrap="wrap" alignItems="center">
                    <AppList apps={window.props.settings.apps}  />
                </Box>
                <Divider />
            </Container>
        </>
    );
}


if (window.react_mount) {
    render(
        <DashboardPage />,
        window.react_mount
    );

}