import React, { useState } from 'react';

import Paper from "@material-ui/core/Paper";
import Grid from '@material-ui/core/Grid';
import Link from "@material-ui/core/Link";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 250,
      margin: theme.spacing(2)
    },
    title: {
      fontSize: 14,
    },
    paper: {
        padding: theme.spacing(2),
    }
  }));
  
const AppIcon = (props) => {
    const classes = useStyles();

    const [elevation, setElevation] = useState(0);

    return (
            <Grid key={props.name} item>
                <Link href={props.link} underline="none">
                <Paper className={classes.paper} elevation={elevation} onMouseEnter={function(){setElevation(3)}} onMouseLeave={function(){setElevation(0)}}>
                    {props.name}
                </Paper>
                </Link>  
            </Grid>  
        );
}

export default AppIcon;

