import React from 'react';
import Login from '../pages/login';
import { withA11y } from '@storybook/addon-a11y';
import {muiTheme} from 'storybook-addon-material-ui';

import themeDark from '../themes/dark-theme'
import themeLight from '../themes/light-theme'



export default {
  title: 'Pages/Login Page',
  component: Login,
  decorators: [withA11y, muiTheme([themeLight, themeDark])]
};


export const Normal = () => <Login />;
