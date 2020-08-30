import React, {useState} from 'react';
import { render } from 'react-dom'

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
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
    
    const { t, i18n } = useTranslation();

    const [expanded, setExpanded] = useState(false);
    const [expandedFinished, setExpandedFinished] = useState(false);

    const expand = () => {
        // Closing
        if (expanded)
        {
            setExpandedFinished(false);
        } else {
            setTimeout(function() { setExpandedFinished(!expanded); }, 1500);
        }
        setExpanded(!expanded);
    }


    const headers = ["Name", "Age", "Class"]; 
    const data = [
        ['Jonh Doe', 14, "2V"],
        ['Jane Doe', 14, "2V"],
        ['Alice',    15, "2V"],
        ['Bob',      15, "2V"],
        ['Charles',  14, "2V"],
    ];

    return (
        <>
            <AppBar/>
            <Container maxWidth="md">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <AccountCircleIcon className={classes.avatar} />
                    </Avatar>
                    <Typography component="h1" variant="h4" className={classes.welcomeText}>
                        {t('welcome')}, {window.props.settings.username}
                    </Typography>
                </div>
                <Divider />

                <Box display="flex" flexDirection="row" p={1} m={1} flexWrap="wrap" alignItems="center">
                    <AdminCard name="Students" count={300} />
                    <AdminCard name="Teachers" count={48}  />
                    <AdminCard name="Classes"  count={16}  />
                    <AdminCard name="Students" count={200} />
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