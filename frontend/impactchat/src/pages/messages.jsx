import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';

import SendIcon from '@material-ui/icons/Send';

// import ToggleDarkMode from '../components/toogleDarkMode';
import MessageList from '../components/messageList';
import ChannelList from '../components/channelList';
import InputField from '../components/inputField';

import Skeleton from '@material-ui/lab/Skeleton';
import IconButton from '@material-ui/core/IconButton';


import ReconnectingWebSocket from 'reconnecting-websocket'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  content: {
    // marginTop: AppBar.height,
    paddingLeft: "0px"
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '0.5fr 2.1fr 0.4fr',
    gridTemplateRows: '0.0fr 3.3fr 0.2fr 0.1fr',
    gap: '1px 1px',
    gridTemplateAreas: `". . ." "Channels Messages Online" "Channels Input Online" "Channels . Online"`,
  },
  Online: { gridArea: 'Online',                         },
  Channels: { gridArea: 'Channels',                     },
  Messages: { gridArea: 'Messages', overflow: 'auto', maxHeight: '85vh' },
  Input: { gridArea: 'Input',                           },
  
}));

  
export default function MessageDisplay(props) {
  const classes = useStyles();
  document.body.style.overflow = "hidden";

  const [messages, setMessages] = React.useState(['a', 'b']);
  const [inputMessage, setInputMessages] = React.useState("");

  const roomName = "lobby";

  const chatSocket = new ReconnectingWebSocket(
      'ws://'
      + window.location.host
      + '/ws/chat/'
      + roomName
      + '/'
  );
  chatSocket.onopen = function(e) {
    console.log('Chat socket opened');
    // chatSocket.send(JSON.stringify({message: "abcde"}));
  };

  chatSocket.onmessage = function(e) {
      const data = JSON.parse(e.data);
      console.log(data);
      setMessages([...messages, data.message]);
  };

  chatSocket.onclose = function(e) {
      console.log('Chat socket closed');
  };

  return (
      <>
            <div className={classes.gridContainer}>
                <div className={classes.Channels}>
                  <ChannelList />
                </div>
                <div className={classes.Messages}>
                  <MessageList messages={messages} />
                </div>
                <div className={classes.Input}>
                  <InputField
                    style={{marginLeft: '10px', marginRight: '10px'}}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="message"
                    label="Message"
                    name="message"
                    autoComplete="off"
                    value={inputMessage}
                    onChange={function(e){setInputMessages(e.target.value)}}
                />
                <IconButton onClick={function(){chatSocket.send(JSON.stringify({message: inputMessage}));setInputMessages("")}}>
                  <SendIcon />
                </IconButton>

              </div>
              <div className={classes.Online}>
                <Skeleton />
              </div>
            </div>
    </>
  );
}
