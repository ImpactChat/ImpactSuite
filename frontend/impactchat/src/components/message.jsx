import React from 'react';

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import Skeleton from '@material-ui/lab/Skeleton';

import MDRenderer from './markdownRenderer';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    // maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
    paddingTop: theme.spacing(2)
  },
}));


export default function Message(props) {
  const classes = useStyles();
    if (!props.isLoading)
    {
        const message = props.message;
        
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Avatar>W</Avatar>
                        </Grid>
                        <Grid item xs>
                            <Typography variant="body1"><MDRenderer source={message} /></Typography>
                        </Grid>
                    </Grid>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item xs>
                            <Typography variant="body2" align="right">{props.datetime}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
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
