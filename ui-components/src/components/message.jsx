import React from 'react';

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import Skeleton from '@material-ui/lab/Skeleton';

import blue from '@material-ui/core/colors/blue';

import MDRenderer from './markdownRenderer.jsx';

import moment from 'moment';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    // maxWidth: 400,
    padding: theme.spacing(2),
    margin: theme.spacing(0)
  },
  a: {
      color: blue[500]
  },
  message: {
      '& p': {
        marginTop: 0,
        wordBreak: 'break-word',
        overflowWrap: 'break-word'
      }
  }
}));


export default function Message(props) {
  const classes = useStyles();
    if (!props.isLoading)
    {
        const message = props.message;
        const renderers = {
            link: (props) => 
                <a target="_blank" rel="noopener noreferrer" href={props.href} className={classes.a}>{props.children[0].props.children}</a>,
            text: (props) =>
                <span>{props.children}</span>

        }
        const timestamp = moment(props.datetime).local();
        const offset = timestamp.fromNow();
        
        return (
            <div className={classes.root}>
                <Paper className={classes.paper} eleation={0} square>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Avatar>{props.avatar}</Avatar>
                        </Grid>
                        <Grid item container direction="column">
                            <Grid item>
                                <Typography variant="subtitle1">
                                    {props.username}
                                </Typography>
                            </Grid>
                            <Grid item xs className={classes.message}>
                                <MDRenderer source={message} renderers={renderers} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item xs>
                            <Typography variant="body2" align="right">{offset}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
                <Divider />
            </div>
        );
    } else {
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Skeleton animation="wave" variant="circle" width={40} height={40} />
                        </Grid>
                        <Grid item xs>
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                        </Grid>
                    </Grid>
                    <Grid container justify="flex-end" spacing={1}>
                        <Grid item>
                            <Skeleton animation="wave" width={80} />
                        </Grid>
                    </Grid>

                </Paper>
            </div>
        );
    } 
}
