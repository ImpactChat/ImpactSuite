import React from 'react';
import Input from '../components/inputField';
import { withA11y } from '@storybook/addon-a11y';

export default {
  title: 'InputField',
  component: Input,
  decorators: [withA11y]
};


export const Normal = () => <Input label="Username" />;
export const Outlined = () => <Input variant="outlined" label="Username"/>;
export const Filled = () => <Input variant="filled" label="Username"/>;
export const Password = () => <Input variant="outlined" type="password" label="Password" />;
