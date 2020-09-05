import React from 'react';
import { render } from 'react-dom'

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';

import { useTranslation } from 'react-i18next';


import AppBar from '../../../components/topAppBar.jsx';

import '../../../i18n/i18n.js';


export const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2),
        maxWidth: 345,
      },
    
    

}));

export default function ProfilePage(props) {
    const classes = useStyles();

    const [lang, setLang] = React.useState(window.props.curlang);

    const { t, i18n } = useTranslation();

    return (
        <>
            <AppBar />
            <Toolbar />
            <Container maxWidth="xl">
                <Typography variant="h2" color="initial">
                    Classes you're a  part of
                </Typography>
            </Container>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Math
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Teachers: John Doe and Jane Doe
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    );
}


if (window.react_mount) {
    render(
        <ProfilePage />,
        window.react_mount
    );

}