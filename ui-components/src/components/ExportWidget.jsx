import React from 'react';
import Link from '@material-ui/core/Link';

class DownloadField extends React.Component {
    render()
    {
        return (
            <Link href={this.props.link}>
                Download
            </Link>
        );
    }
}

export default DownloadField;