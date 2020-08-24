import React from 'react';
import Message from '../components/message';
import { withA11y } from '@storybook/addon-a11y';

export default {
  title: 'Message',
  component: Message,
  decorators: [withA11y]
};

const message = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud `;
const messageMarkdown = `**This is bold text** *This is italic text* ~~Strikethrough~~ https://google.ca`;
const messageMathJax = `When $a \\ne 0$, there are two solutions to $ax^2 + bx + c = 0$ and they are  
$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$`;
const messageMDMathJax = `When $a \\ne 0$, there are **two** solutions to $ax^2 + bx + c = 0$ and they are  
$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$`;

export const Normal = () => <Message message={message} avatar="W" datetime="2020-03-27 12:30" />;
export const Markdown = () => <Message message={messageMarkdown} avatar="W" datetime="2020-03-27 12:30" />;
export const MathJax = () => <Message message={messageMathJax} avatar="W" datetime="2020-03-27 12:30" />;
export const MarkdownMathJax = () => <Message message={messageMDMathJax} avatar="W" datetime="2020-03-27 12:30" />;
export const Loading = () => <Message message={message} avatar="W" isLoading={true} />;