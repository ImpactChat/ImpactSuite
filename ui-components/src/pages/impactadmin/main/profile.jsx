import React from 'react';
import { render } from 'react-dom'

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';

import { useTranslation } from 'react-i18next';


import { Divider } from '@material-ui/core';

import AppBar from '../../../components/topAppBar.jsx';
import { getCookie, CSRFToken } from '../../../components/CSRFToken.jsx';

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
        width: 100,
        height: 100,
        backgroundColor: theme.palette.primary.main,
    },
    welcomeText: {
        margin: theme.spacing(1, 1, 5)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    
}));

export default function ProfilePage(props) {
    const classes = useStyles();

    const [lang, setLang] = React.useState(window.props.curlang);

    const handleChange = (event) => {
        setLang(event.target.value);
    };
  

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            "language": lang,
        }
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-CSRFToken', getCookie('csrftoken'));

        fetch("/profile/", {
            method: 'POST', 
            headers: headers,
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(function(data){location.reload()})
    }
    
    const { t, i18n } = useTranslation();

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
                <form action="/i18n/setlang/" method="post" onSubmit={handleSubmit} >
                    <CSRFToken />
                    <FormControl className={classes.formControl}>
                        <InputLabel>{t('lang')}</InputLabel>
                        <Select
                            value={lang}
                            onChange={handleChange}
                        >
                            {
                                window.props.availableLang.map((val, i) => {
                                    return (
                                         <MenuItem key={val[0]} value={val[0]}>  {val[1]}</MenuItem>
                                    );
                                })
                            }   
                        </Select>
                    </FormControl>
                    <br />
                    <Button
                        variant="outlined"
                        color="primary"
                        type="submit" 
                        value="Submit"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                    >
                        {t('save')}
                    </Button>
                </form>
            </Container>
        </>
    );
}


if (window.react_mount) {
    render(
        <ProfilePage />,
        window.react_mount
    );

}