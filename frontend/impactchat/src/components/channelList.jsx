import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


import Icon from '@material-ui/core/Icon';


const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        maxHeight: '100%',
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        flexGrow: 1,
        display: 'flex',
        '& button': {
            maxWidth: '100%'
        }
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
    tabs: {
        maxWidth: '100%',
        borderRight: `1px solid ${theme.palette.divider}`,
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
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    


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
                            <div key={item.channelID.toString()}>
                                <ListItem button
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
                            </div>

                        );
                    }
                    else
                        return <Divider key={`div-${Math.random()}`} />
                })}
            </List>
        );
    };
    const generateTabList = function(list, idx) {
        if (list.length === 0)
            return
        return (
            <div className={classes.root}>
                <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
                >
                    <Tab label="Item One" {...a11yProps(0)} />
                    <Tab label="Item Two" {...a11yProps(1)} />
                    <Tab label="Item Three" {...a11yProps(2)} />
                    <Tab label="Item Four" {...a11yProps(3)} />
                    <Tab label="Item Four Four Four Four Four Four Four Four Four Four Four Four Four Four Four Four Four Four" {...a11yProps(4)} />
                    <Tab label="Item Six" {...a11yProps(5)} />
                    <Tab label="Item Seven" {...a11yProps(6)} />
                </Tabs>
        </div>
        );
    };

    return (
        <div className={classes.root}>
            {generateTabList(channelList.channels, 0)}
        </div>
    );
}


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }
  