import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Brightness4Icon from '@material-ui/icons/Brightness4';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import Login from './components/loginPage'

import lightTheme from './themes/light-theme.js';
import darkTheme from './themes/dark-theme.js';


const getThemeLight = () => createMuiTheme(lightTheme);
const getThemeDark = () => createMuiTheme(darkTheme);


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: getThemeDark,
    }
    this.toggleDarkMode = this.toggleDarkMode.bind(this);
  }

  toggleDarkMode() {
    this.setState(prevState => ({
      theme: prevState.theme === getThemeLight ? getThemeDark : getThemeLight
    }))};

  render() {
      return (
        <MuiThemeProvider theme={this.state.theme()}>
          <CssBaseline/>
          <ToggleDarkMode toggle={this.toggleDarkMode}/>
          <Login />
          <div className="App">
            <p>Hello, World</p>
            {/* <Login /> */}
          </div>
        </MuiThemeProvider>
    );
  }
}



class ToggleDarkMode extends React.Component {
    render() {
        return (
            <IconButton onClick={this.props.toggle} aria-label="toggleDarkMode">
                <Brightness4Icon fontSize="large" />
            </IconButton>
        );
    }
}
export default App;
