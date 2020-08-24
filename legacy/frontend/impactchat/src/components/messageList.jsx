import React from 'react';

import Message from './message';


// const longmessage = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus nesciunt accusantium pariatur magni tempora quibusdam iusto ex et, placeat porro aspernatur, assumenda, incidunt velit. Minima ab a maxime dicta debitis?
// Quia deleniti optio possimus maxime, autem veniam facilis cum tempora perferendis nam dolores earum eligendi unde error nesciunt velit iusto quasi harum odit minima quas explicabo, nemo praesentium vitae? Iure?
// Totam aliquid optio libero ab nobis dolorum quo magnam suscipit ea reiciendis, ducimus dolorem esse eligendi debitis. Dolore, expedita nisi vero soluta tempora harum cum! Sint fugit nulla non inventore.
// Obcaecati, eaque consequuntur veniam animi velit, blanditiis sunt ipsa tenetur est minus totam eligendi sit fuga ut saepe officiis dicta. Et maiores cum magni, eum reprehenderit tempore praesentium numquam sunt.
// Cumque aliquid inventore molestiae quibusdam quis officia, ipsa nulla reprehenderit expedita dolores possimus, quod totam sapiente at voluptates sequi eius officiis ad assumenda vel? Recusandae excepturi nisi facere vel aut. 
// `;
// const message = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus nesciunt accusantium pariatur magni tempora quibusdam iusto ex et, placeat porro aspernatur, assumenda, incidunt velit. Minima ab a maxime dicta debitis?`
// const messageMarkdown = `**This is bold text** *This is italic text* ~~Strikethrough~~  
// [Google](https://www.google.com)`;
// const messageMathJax = `When $a \\ne 0$, there are two solutions to $ax^2 + bx + c = 0$ and they are  
// $$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$`;
// const messageMDMathJax = `When $a \\ne 0$, there are **two** solutions to $ax^2 + bx + c = 0$ and they are  
// $$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$`;

export default function MessageList(props)
{
    if (!props.loading)
        return (
            <>
                {/* <Message message={longmessage} avatar="W" datetime="2020-03-27 12:30" />
                <Message message={messageMarkdown} avatar="W" datetime="2020-03-27 12:30" />
                <Message message={messageMathJax} avatar="W" datetime="2020-03-27 12:30" />
                <Message message={messageMDMathJax} avatar="W" datetime="2020-03-27 12:30" />
                <Message message={message} avatar="W" datetime="2020-03-27 12:30" />
                <Message message={message} avatar="W" datetime="2020-03-27 12:30" />
                <Message message={message} avatar="W" datetime="2020-03-27 12:30" />
                <Message message={message} avatar="W" datetime="2020-03-27 12:30" />
                <Message message={message} avatar="W" datetime="2020-03-27 12:30" />
                <Message message={message} avatar="W" datetime="2020-03-27 12:30" />
                <Message message={message} avatar="W" datetime="2020-03-27 12:30" />
                <Message message={message} avatar="W" datetime="2020-03-27 12:30" />
                <Message message={message} avatar="W" datetime="2020-03-27 12:30" />
                <Message message={message} avatar="W" datetime="2020-03-27 12:30" />
                <Message message={message} avatar="W" datetime="2020-03-27 12:30" />
                <Message message={message} avatar="W" datetime="2020-03-27 12:30" /> */}
                {
                    props.messages.map((val, i) =>  <Message message={val.content} key={val} avatar={val.avatar} datetime={val.timestamp} />)
                }
            </>
        );
    return (
        <>
            <Message isLoading={true} />
            <Message isLoading={true} />
            <Message isLoading={true} />
            <Message isLoading={true} />
            <Message isLoading={true} />
            <Message isLoading={true} />
            <Message isLoading={true} />
        </>
    );
}
