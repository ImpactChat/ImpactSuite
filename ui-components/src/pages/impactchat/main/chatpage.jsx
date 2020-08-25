import React from 'react';
import { render } from 'react-dom'

import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from '@material-ui/core/InputAdornment';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';

import ChannelList from '../../../components/channelList.jsx';
import AppBar from '../../../components/topAppBar.jsx';
import Message from '../../../components/message.jsx';
import InputField from '../../../components/inputField.jsx';
import ChatFAB from '../../../components/chatFab.jsx';

import ReconnectingWebSocket from 'reconnecting-websocket';

import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { withSnackbar } from 'notistack';
import { SnackbarProvider } from 'notistack';

export const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    welcomeText: {
        margin: theme.spacing(1, 1, 5)
    },
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: '0.5fr 2.1fr 0.1fr',
        gridTemplateRows: '0.0fr 3.3fr 0.2fr 0.1fr',
        gap: '1px 1px',
        gridTemplateAreas: `". . ." "Channels Messages Online" "Channels Input Online" "Channels . Online"`,
    },
    Messages: { gridArea: 'Messages', overflow: 'auto', maxHeight: '85vh' },
    Input: { gridArea: 'Input',                           },
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
    
    
});

const actions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
    { icon: <FavoriteIcon />, name: 'Like' },
  ];
  

// Out of scope because `render` is called multiple times
// which means duplicate sockets are created
const roomName = window.props.channel_pk;
var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
const chatSocket = new ReconnectingWebSocket(
    ws_scheme + '://'
    + window.location.host
    + '/ws/chat/'
    + roomName
    + '/'
);

class ChatPage extends React.Component {
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView(false);
    };
    componentDidMount() {
        this.scrollToBottom();
    }
    
    componentDidUpdate() {
        this.scrollToBottom();
    }

    constructor (props) {
        super(props);
        this.state = {
            messages: window.props.messages,
            open: false,
            channels: window.props.channels
          }

        console.log(roomName)
        if (roomName === null)
        {
            window.location.href = window.props.settings.links.chat_app
        }

      
    };  
    render() {
        const { classes } = this.props;


        chatSocket.onopen = function(e) {
            console.log('Chat socket opened!');
        };
        chatSocket.onmessage = function(e) {
              const data = JSON.parse(e.data);
              console.log("Received message from WS:", data);
              if (data.new_message) {  // New chat message
                    this.setState({messages: [...this.state.messages, data.new_message]})
              } else if (data.new_channel) {  //  New channel created
                this.setState({channels: [...this.state.channels, data.new_channel]})
              } else if (data.message) {  // New message from django
                    this.props.enqueueSnackbar(data.message, { 
                        variant: data.severity,
                    })
              } else if (data.channels_deleted)  {
                    const temp = this.state.channels
                    for (var i = 0; i < temp.length; i++)
                    {
                            console.log(i, this.state.channels.length)
                            if ((data.channels_deleted.some(c => c.pk === temp[i].pk)))
                            {
                                this.setState(state => {
                                    const channels = this.state.channels.filter((item, j) => i !== j);
                                    return {
                                        channels,
                                    };
                                });
                              console.log(this.state.channels)
                            }
                    }
              } else {
                  console.log("The above message wasn't handled")
              }
        }.bind(this);
      
        chatSocket.onclose = function(e) {
              console.log('Chat socket closed');
        };

        return (
            <>
                <AppBar logout_link="/logout" username={window.props.settings.username}/>
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Grid container spacing={3}>
                            <Grid item xs={2}>
                                <ChannelList channels={this.state.channels} />
                            </Grid>
                            <Grid item xs={12} sm={9}  >
                                    <div className={classes.Messages}>
                                        {this.state.messages.map((val, idx)=>{
                                            return (
                                                <Message avatar={val.author.avatar} datetime={val.timestamp} message={val.content} username={val.author.username} key={val.pk}/>
                                            );
                                            
                                        })}
                                        <div style={{ float:"left", clear: "both" }}
                                            ref={(el) => { this.messagesEnd = el; }}>
                                        </div>

                                    </div>
                                    <div className={classes.Input}>
                                        <MessageInput socket={chatSocket} />
                                    </div>

                            </Grid>
                        </Grid>
                    </div>
                    {window.props.can_manage ? <ChatFAB socket={chatSocket} channels={this.state.channels} /> : null}

            </>
        );
    }
}

class MessageInput extends React.Component {
    handleInputChange = (e) => {
      this.setState({inputMessage: e.target.value})
    }
  
    handleInputSubmit = (e) => {
      e.preventDefault();
      if (this.state.inputMessage === "")
      {
        return
      }
      console.log("Sending:", this.state.inputMessage)
      this.props.socket.send(JSON.stringify({message: this.state.inputMessage, channel: window.props.channel_pk, type: 'chat.new'}));
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
        <form onSubmit={this.handleInputSubmit}>
            <InputField
              style={{marginLeft: '10px', marginRight: '10px', }}
              variant="outlined"
              margin="normal"
              fullWidth
              id="message"
              label="Message"
              name="message"
              autoComplete="off"
            //   multiline={true}
              value={this.state.inputMessage}
              onChange={this.handleInputChange}
              InputProps={{
                endAdornment: <InputAdornment position="end"> 
                  <IconButton type={"submit"} onClick={this.handleInputSubmit}>
                      <SendIcon />
                  </IconButton>
                </InputAdornment>,
              }}
          />
         
        </form>
    );
    }
}
  

if (window.react_mount) {
    ChatPage =  withSnackbar(withStyles(styles, { withTheme: true })(ChatPage));
    render(
        <SnackbarProvider maxSnack={3}>
            <ChatPage />
        </SnackbarProvider>,
        window.react_mount
    );

}

