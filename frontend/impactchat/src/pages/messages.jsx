import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';

import AddIcon from '@material-ui/icons/Add';

// import ToggleDarkMode from '../components/toogleDarkMode';
import MessageList from '../components/messageList';
import ChannelList from '../components/channelList';
import InputField from '../components/inputField';



import Skeleton from '@material-ui/lab/Skeleton';


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
  return (
      <>
        {/* <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              ImpactChat
            </Typography>
            <ToggleDarkMode toggle={props.toggle} />
            <Button color="inherit">Logout</Button>
          </Toolbar>
        </AppBar> */}

        {/* <Container component="main" maxWidth="xl" className={classes.content} >
          <CssBaseline /> */}
            <div className={classes.gridContainer}>
                <div className={classes.Channels}>
                  <ChannelList />
                </div>
                <div className={classes.Messages}>
                  <MessageList />
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
                />
              </div>
              <div className={classes.Online}>
                <Skeleton />
              </div>
            </div>
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>

      {/* </Container> */}
    </>
  );
}


/*
  return (
      <>
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              ImpactChat
            </Typography>
            <ToggleDarkMode toggle={props.toggle} />
            <Button color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>

        <Container component="main" maxWidth="xl" className={classes.content} >
          <CssBaseline />
          <Grid container>
            <Grid item sm={3} >
              <Box style={{maxHeight: '95vh', minHeight: '95vh', overflow: 'auto'}}>
                  <ChannelList />
              </Box>
            </Grid>
            <Grid item sm={7} >
                <Box style={{maxHeight: '95vh', minHeight: '95vh', overflow: 'auto'}}>
                  <MessageList />
                  <Box style={{width: '100%', marginLeft: '5px',}}>
                    <InputField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="message"
                      label="Message"
                      name="message"
                      autocomplete="off"
                      autoFocus
                  />
                  </Box>
                </Box>
            </Grid>
            <Grid item sm={2} >
            <Skeleton />
            </Grid>
          </Grid>
      </Container>
    </>
  );
*/
