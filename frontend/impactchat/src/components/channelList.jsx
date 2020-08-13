import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


import Icon from '@material-ui/core/Icon';


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

const channelList = {
    channels: [
        {
            name: "General",
            channelID: 0,
            icon: "view_headline",
            children: [],

        },
        {
            name: "About",
            channelID: 1,
            icon: "view_headline",
            children: [],
        },
        "divider",
        {
            name: "Chapter 1",
            subtitle: "Fractions & Numbers",
            channelID: 2,
            icon: "assignment",
            children: [
                {
                    name: "Course Material",
                    channelID: 3,
                    icon: "subject_icon",
                    children: []
                },
                {
                    name: "Questions",
                    channelID: 4,
                    icon: "question_answer_icon",
                    children: []
                },
            ]
        },
        "divider",
        {
            name: "Chapter 2",
            subtitle: "Triangles",
            channelID: 5,
            icon: "assignment",
            children: []
        },
        
    ]
}




export default function ChannelList() {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(channelList.channels[0].channelID);

    // const [open, setOpen] = React.useState([]);


    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const generateList = function(list, idx) {
        if (list.length === 0)
            return
        return (
            <List component="nav" key={Math.random().toString()}>
                {list.map((item, i) => {
                    if (!(item === "divider"))
                    {

                        return (
                            <>
                                <ListItem button
                                    key={item.channelID.toString()}
                                    className={idx !== 0 ? classes.nested : null}
                                    selected={selectedIndex === item.channelID}
                                    onClick={function (event) { handleListItemClick(event, item.channelID); /*handleClick(i)*/}}
                                >
                                    <ListItemIcon>
                                        <Icon>{item.icon}</Icon>
                                    </ListItemIcon>
                                    <ListItemText primary={item.name} secondary={item.subtitle === undefined ? null : item.subtitle} />
                                </ListItem>
                                {generateList(item.children, idx + 1)}
                            </>

                        );
                    }
                    else
                        return <Divider key={`div-${Math.random()}`} />
                })}
            </List>
        );
    };

    return (
        <div className={classes.root}>
            {generateList(channelList.channels, 0)}
        </div>
    );
}
