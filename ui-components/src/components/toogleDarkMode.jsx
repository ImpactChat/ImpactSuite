import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Brightness4Icon from '@material-ui/icons/Brightness4';


export default class ToggleDarkMode extends React.Component {
    render() {
        return (
            <IconButton onClick={this.props.toggle} aria-label="toggleDarkMode">
                <Brightness4Icon fontSize="large" />
            </IconButton>
        );
    }
}
