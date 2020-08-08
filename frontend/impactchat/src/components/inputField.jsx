import React from 'react';
import TextField from '@material-ui/core/TextField';

export default class InputField extends React.Component {
    render()
    {
        return (
            <TextField
                variant={this.props.variant}
                margin="normal"
                fullWidth
                id={this.props.id}
                label={this.props.label}
                name={this.props.name}
                autoComplete={this.props.autoComplete}
                {...this.props}
            />
        );
    }
}