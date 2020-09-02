import React, {useState} from 'react';
import { render } from 'react-dom'

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Lock from '@material-ui/icons/Lock';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from "@material-ui/core/Box";

import { useTranslation } from 'react-i18next';

import { Divider } from '@material-ui/core';

import AppBar from '../../../components/topAppBar.jsx';
import AdminCard from '../../../components/adminCard.jsx';

import '../../../i18n/i18n.js';


export const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        width: 50,
        height: 50,
        backgroundColor: theme.palette.primary.main,
    },
  
}));
  

export default function AdminPage(props) {
    const classes = useStyles();
    
    // const { t, i18n } = useTranslation();


    return (
        <>
            <AppBar/>
            <Container maxWidth="md">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <Lock className={null} />
                    </Avatar>
                </div>
                <Divider />

                <Box display="flex" flexDirection="row" p={1} m={1} flexWrap="wrap" alignItems="center">
                    {
                        window.props.models.map((val, i) => (
                            <AdminCard key={val.name} name={val.name} count={val.count} headers={val.headers} type={val['api-name']} source={val['api-link:get']}/>
                        ))
                    }
                </Box>

            </Container>
        </>
    );
}


if (window.react_mount) {
    render(
        <AdminPage />,
        window.react_mount
    );

}