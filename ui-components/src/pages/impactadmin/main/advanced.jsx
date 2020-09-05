import React, { useState } from 'react';
import { render } from 'react-dom'

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Lock from '@material-ui/icons/Lock';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import { useTranslation } from 'react-i18next';


import AppBar from '../../../components/topAppBar.jsx';
import DenseTable from '../../../components/denseTable.jsx';
import AddNewWidget from '../../../components/AddNewWidget.jsx';
import ExportModelWidget from '../../../components/ExportWidget.jsx';

import '../../../i18n/i18n.js';


export const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: `calc(100vh - 72px)`,
    },
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
    list: {
        width: '100%',
        borderRight: "1px solid #d2d2d2",
        height: '100%',
        overflow: "none",
    },
    listItem: {
        borderTopRightRadius: 24,
        borderBottomRightRadius: 24,
    },

}));
function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}


export default function AdminPage(props) {
    const classes = useStyles();
    // const { t, i18n } = useTranslation();

    const [selected, setSelected] = useState(0);
    const [subSelected, setsubSelected] = useState(1);
    const [open, setOpen] = useState(false);

    const subOptions = [
        "Add new",
        "Explore",
        "Export"
    ]

    const models = window.props.models;
    const [selectedModel, setSelectedModel] = useState(models[selected]);


    const AddWidget = (
        <AddNewWidget url={selectedModel['api-link:get']} name={selectedModel['api-name']} test={selectedModel} />
    );
    const ExploreWidget = (
        <DenseTable rowsPerPage={20} model={selectedModel} test={selectedModel} type={selectedModel['api-name']} headers={selectedModel['headers']} source={selectedModel['api-link:get']} />
    );
    const ExportWidget = (
        <ExportModelWidget link={selectedModel['download-link']} />
    );

    const widgets = [
        AddWidget,
        ExploreWidget,
        ExportWidget,
    ];

    const handleSelectedChange = (i) => {
        setSelected(i);
        setSelectedModel(models[i]);
    };

    return (
        <>
            <AppBar />
            <CssBaseline />
            <Toolbar />
            <Grid container spacing={3} className={classes.root}>
                <Grid item xs={2} className={classes.nav}>
                    <List component="nav" className={classes.list}>
                        {
                            window.props.models.map((val, i) => (
                                <ListItem key={val.name} button className={classes.listItem} selected={i === selected} onClick={function(){handleSelectedChange(i);}}>
                                    <ListItemText primary={val.name} secondary={`${val.count} ${val.name.toLowerCase()}`} />
                                        <ListItemIcon>
                                            <IconButton onClick={() => setOpen(!open)}>
                                                    <NavigateNextIcon />
                                            </IconButton>
                                        </ListItemIcon>
                                </ListItem>
                            ))
                        }
                    </List>
                </Grid>
                {
                    open 
                    ? <Grid item xs={2} className={classes.subnav}>
                        <List component="nav" className={classes.list}>
                            {
                                subOptions.map((val, i) => (
                                    <ListItem key={val} button className={classes.listItem} selected={i === subSelected} onClick={function(){setsubSelected(i);}}>
                                        <ListItemText primary={val}  />
                                    </ListItem>
                                ))
                            }
                        </List>
                    </Grid>
                    : null
                }
                <Grid item xs={open ? 8 : 10}>
                        <Box m="auto">
                            {
                                widgets[subSelected]
                            }
                        </Box>
                </Grid>
            </Grid>

        </>
    );
}


if (window.react_mount) {
    render(
        <AdminPage />,
        window.react_mount
    );

}