import React, { useState } from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from "@material-ui/core/Link";

import { makeStyles } from '@material-ui/core/styles';

import { useTranslation } from 'react-i18next';
import '../i18n/i18n.js';


const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 250,
      margin: theme.spacing(2)
    },
    title: {
      fontSize: 14,
    },
  }));
  
const AppIcon = (props) => {
    const classes = useStyles();
    const { t, i18n } = useTranslation();

    return (
        <Card className={classes.root} variant="outlined" >
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom align="center">
            {props.verb}
          </Typography>
          <Typography variant="h5" component="h2" align="center">
            {props.name}
          </Typography>
        </CardContent>
        <CardActions>
              <Link href={props.link} component={Button} underline="none" >
                  {t('open')}
              </Link>
        </CardActions>
      </Card>

    );
}

export default AppIcon;

