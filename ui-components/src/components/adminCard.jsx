import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import clsx from 'clsx';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

import DenseTable from './denseTable.jsx';

import '../i18n/i18n.js';


export const useStyles = makeStyles((theme) => ({
    card: {
        minWidth: 250,
        minHeight: 150,
        margin: theme.spacing(2),
        transition: `
            min-height     1s,
            min-width      0.5s 1s`,
    },
    cardExpanded: {
        minWidth: '100%',
        minHeight: 350,
        margin: theme.spacing(2),
        transition: `
            min-width      1s,
            min-height     0.5s 1s`,
    },
    title: {
        fontSize: 14,
    },
    table: {
    },
    tableRoot: {
        width: `calc(100% - (${theme.spacing(1)}px*2));`,
        margin: theme.spacing(1)
    }

}));


export default function AdminCard(properties) {
    const classes = useStyles();

    // const { t, i18n } = useTranslation();

    const [expanded, setExpanded] = useState(false);
    const [expandedFinished, setExpandedFinished] = useState(false);

    const expand = () => {
        if (expanded) {
            setExpandedFinished(false);
        } else {
            setTimeout(function () { setExpandedFinished(!expanded); }, 1500);
        }
        setExpanded(!expanded);
    }


    const headers = [
        {
            "display": "Username",
            "actual": "username",
        },
        {
            "display": "Full name",
            "actual": "full name",
        },
        {
            "display": "Avatar",
            "actual": "avatar",
        },
    ];
    const data = [
        ['Jonh Doe', 14, "2V"],
        ['Jane Doe', 14, "2V"],
        ['Alice', 15, "2V"],
        ['Bob', 15, "2V"],
        ['Charles', 14, "2V"],
    ];

    const itemName = properties.name;
    const itemCount = properties.count

    return (
        <>
            <Card className={clsx('', {
                [classes.cardExpanded]: expanded,
                [classes.card]: !expanded,
            })} variant="outlined" >
                <CardHeader
                    action={
                        <IconButton aria-label="settings">
                            <OpenInNewIcon />
                        </IconButton>
                    }
                    title={itemName}
                    subheader={`${itemCount} ${itemName.toLowerCase()}`}
                />

                {/* <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom align="center">
                        {itemCount} {itemName.toLowerCase()}
                    </Typography>
                    <Typography variant="h5" component="h2" align="center">
                        {itemName}
                    </Typography>
                </CardContent> */}
                <CardActions>
                    <IconButton onClick={expand} >
                        {
                            expandedFinished
                                ? <KeyboardArrowUpIcon />
                                : <KeyboardArrowDownIcon />
                        }
                    </IconButton>
                </CardActions>
                <CardContent
                    style={{
                        padding: 0
                    }}
                >
                    { // TODO: Find a way to load AJAX during transition
                        expandedFinished
                            ? <DenseTable type={properties.type} headers={headers} source={properties.source} />
                            : null
                    }
                </CardContent>
            </Card>
        </>
    );
}

AdminCard.propTypes = {
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired
};
