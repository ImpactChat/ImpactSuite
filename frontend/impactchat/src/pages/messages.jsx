import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import ToggleDarkMode from '../components/toogleDarkMode';
import Message from '../components/message'

export const useStyles = makeStyles((theme) => ({
}));

const message = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud `;
  
export default function LoginPage(props) {
        const classes = useStyles();
        return (
            <>
            <ToggleDarkMode toggle={props.toggle} />
                <Container component="main" maxWidth="m">
                <CssBaseline />
                <Message message={message} avatar="W" datetime="2020-03-27 12:30" />
                <Message message={message} avatar="W" datetime="2020-03-27 12:30" />
                <Message message={message} avatar="W" datetime="2020-03-27 12:30" />
                <Message message={message} avatar="W" datetime="2020-03-27 12:30" />
                <Message message={message} avatar="W" datetime="2020-03-27 12:30" />
                <Message message={message} avatar="W" datetime="2020-03-27 12:30" />
            </Container>
          </>
        );
}
