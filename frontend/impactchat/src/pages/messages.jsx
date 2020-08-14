import React from 'react';

import { withStyles } from "@material-ui/core/styles";

import MessageList from '../components/messageList';
import ChannelList from '../components/channelList';
import InputField from '../components/inputField';
import Settings from '../components/settings';


import Skeleton from '@material-ui/lab/Skeleton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SendIcon from '@material-ui/icons/Send';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


import ReconnectingWebSocket from 'reconnecting-websocket';


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
    this.setState({messages: [...this.state.messages, data.message]})
};
chatSocket.onclose = function(e) {
    console.log('Chat socket closed');
};


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  content: {
    // marginTop: AppBar.height,
    paddingLeft: "0px"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
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
  
});


  
class MessageDisplay extends React.Component {

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  
  componentDidMount() {
    this.scrollToBottom();
  }
  
  componentDidUpdate() {
    this.scrollToBottom();
  }

  constructor(props)
  {
    super(props);
    this.state = {
      messages: ['a', 'b'],
    }
  }
  render() {
    const { classes } = this.props;

    document.body.style.overflow = "hidden";

    return (
        <>
              <div className={classes.gridContainer}>
                  <div className={classes.Channels}>
                    <ChannelList />
                  </div>
                  <div className={classes.Messages}>
                    <MessageList messages={this.state.messages} />
                    <div style={{ float:"left", clear: "both" }}
                      ref={(el) => { this.messagesEnd = el; }}>
                  </div>
                  </div>
                  <div className={classes.Input}>
                    <MessageInput />

                </div>
                <div className={classes.Online}>
                  <Settings toggle={this.props.toggle}/>
                  <Skeleton />
                </div>
              </div>
      </>
    );
  }
}

class MessageInput extends React.Component {
  handleInputChange = (e) => {
    this.setState({inputMessage: e.target.value})
  }

  handleInputSubmit = () => {
    chatSocket.send(JSON.stringify({message: this.state.inputMessage}));
    this.setState({inputMessage: ""})
  }

  constructor(props)
  {
    super(props);
    this.state = {
      inputMessage: ""
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
  }



  render() {
    return (
      <>
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
            value={this.state.inputMessage}
            onChange={this.handleInputChange}
            InputProps={{
              endAdornment: <InputAdornment position="end"> 
                <IconButton onClick={this.handleInputSubmit}>
                    <SendIcon />
                </IconButton>
              </InputAdornment>,
            }}
        />
       
      </>
  );
  }
}

export default withStyles(styles, { withTheme: true })(MessageDisplay);
