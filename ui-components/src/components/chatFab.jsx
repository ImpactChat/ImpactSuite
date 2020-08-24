import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Delete from '@material-ui/icons/Delete';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';




const useStyles = makeStyles((theme) => ({
  root: {
    transform: 'translateZ(0px)',
    flexGrow: 1,
  },
  exampleWrapper: {
    position: 'relative',
    marginTop: theme.spacing(3),
    height: 380,
  },
  radioGroup: {
    margin: theme.spacing(1, 0),
  },
  speedDial: {
    position: 'absolute',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
}));

const actions = [
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
  { icon: <FavoriteIcon />, name: 'Like' },
];

export default function ChatFAB(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [newTextChannelValue, setnewTextChannelValue] = React.useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (e) => {
    if (e.target.value.length < 32)
    {
        setnewTextChannelValue(e.target.value);
    } else {
        e.preventDefault();
    }
  }


  const newTextChannel = () => {
    if (newTextChannelValue === "")
    {
      return
    }
    props.socket.send(JSON.stringify({channel: newTextChannelValue, type: 'chat.channel.new'}));
    setnewTextChannelValue("");
    handleCloseChannel();
  }
  const [openChannel, setOpenChannel] = React.useState(false);
  const handleClickOpenChannel = () => {
    setOpenChannel(true);
  };
  const handleCloseChannel = () => {
    setOpenChannel(false);
  };


  const [openChannelDelete, setOpenChannelDelete] = React.useState(false);
  const handleClickOpenChannelDelete = () => {
    setOpenChannelDelete(true);
  };
  const handleCloseChannelDelete = () => {
    setOpenChannelDelete(false);
  };
  const newTextChannelDelete = () => {
        var selected = [];
        for (let [key, value] of ChannelSelect) {
            if (value === true) {
                selected.push(parseInt(key))
            }
        }
        props.socket.send(JSON.stringify({channels: selected, type: 'chat.channel.delete'}));
        handleCloseChannelDelete();
    }
  const [ChannelSelect, setChannelSelect] = React.useState(new Map());
  const handleCheckChange = (e) => {
        const item = e.target.name;
        const isChecked = e.target.checked;
        setChannelSelect(prevState => (new Map(prevState.set(item, isChecked))));
    }





  return (
      <>
        <SpeedDial
          ariaLabel="SpeedDial example"
          className={classes.speedDial}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction="up"
        >
            <SpeedDialAction
              icon={<ChatBubbleIcon />}
              tooltipTitle="New Text Channel"
              onClick={handleClose && handleClickOpenChannel}
            />
            <SpeedDialAction
              icon={<Delete />}
              tooltipTitle="Delete Text Channel"
              onClick={handleClose && handleClickOpenChannelDelete}
            />
        </SpeedDial>

            <Dialog open={openChannel} onClose={handleCloseChannel} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Text Channel</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Type the name of the new text channel here. (max: 32 characters)
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="new_channel"
                    label="Channel Name"
                    type="text"
                    maxLength="2"
                    value={newTextChannelValue}
                    onChange={handleChange}
                    fullWidth
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseChannel} color="primary">
                    Cancel
                </Button>
                <Button onClick={newTextChannel} color="primary">
                    Confirm
                </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openChannelDelete} onClose={handleCloseChannelDelete} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Delete Text Channel</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Select the channels you want to delete
                </DialogContentText>
                {
                    props.channels.map((val)=>{
                        return (
                        <FormControlLabel
                            key={val.pk}
                            control={
                                <Checkbox
                                    checked={ChannelSelect.get(val.pk.toString()) ? ChannelSelect.get(val.pk.toString()) : false} 
                                    onChange={handleCheckChange}
                                    color="primary"
                                    name={val.pk.toString()}
                                />
                            }
                            label={val.name}
                        />
                
                    );})
                }
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseChannelDelete} color="primary">
                    Cancel
                </Button>
                <Button onClick={newTextChannelDelete} color="primary">
                    Confirm
                </Button>
                </DialogActions>
            </Dialog>

        </>
  );
}