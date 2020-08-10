import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import SubjectIcon from '@material-ui/icons/Subject';
import View from '@material-ui/icons/ViewHeadline';
import Assignment from '@material-ui/icons/Assignment';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        maxHeight: '100%',
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    classLogo: {
        margin: 'auto',
        marginBottom: theme.spacing(2),
        height: theme.spacing(7),
        width: theme.spacing(7),
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    
}));


export default function SimpleList() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleClick = () => {
      setOpen(!open);
    };

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    return (
        <div className={classes.root}>
            <List component="nav" aria-label="main mailbox folders">
                <ListItem button
                    selected={selectedIndex === 0}
                    onClick={(event) => handleListItemClick(event, 0)}
                >
                    <ListItemIcon>
                        <View />
                    </ListItemIcon>
                    <ListItemText primary="General" />
                </ListItem>
                <ListItem button
                    selected={selectedIndex === 1}
                    onClick={(event) => handleListItemClick(event, 1)}
                >

                    <ListItemIcon>
                        <View />
                    </ListItemIcon>
                    <ListItemText primary="About" />
                </ListItem>
            </List>
            <Divider />
            <List component="nav" aria-label="main mailbox folders">
                <ListItem button
                    selected={selectedIndex === 2}
                    onClick={function (event) { handleListItemClick(event, 2); handleClick()}}
                >
                    <ListItemIcon>
                        <Assignment />
                    </ListItemIcon>
                    <ListItemText primary="Chapter 1" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button
                            className={classes.nested}
                            selected={selectedIndex === 3}
                            onClick={(event) => handleListItemClick(event, 3)}
                        >
                            <ListItemIcon>
                                <SubjectIcon />
                            </ListItemIcon>
                            <ListItemText primary="Course Material" />
                        </ListItem>
                            <ListItem button
                            className={classes.nested}
                            selected={selectedIndex === 4}
                            onClick={(event) => handleListItemClick(event, 4)}
                            >
                            <ListItemIcon>
                                <QuestionAnswerIcon />
                            </ListItemIcon>
                            <ListItemText primary="Questions" />
                        </ListItem>
                    </List>
                </Collapse>

                <ListItem button
                    selected={selectedIndex === 5}
                    onClick={(event) => handleListItemClick(event, 5)}
                >
                    <ListItemIcon>
                        <Assignment />
                    </ListItemIcon>
                    <ListItemText primary="Chapter 2" />
                </ListItem>

            </List>
        </div>
    );
}
