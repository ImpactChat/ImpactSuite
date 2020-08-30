import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import AppIcon from './appIcon.jsx';

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
  pos: {
    marginBottom: 12,
  },
}));


  
const AppList = (props) => {
    const classes = useStyles();
    return (
    <>
        {
            props.apps.map((val, i) =>  <AppIcon verb={val.verb} name={val.name} link={val.link} key={val.verb}/>)
        }
      </>
      );
};
export default AppList;
