import React from 'react';
import { Chat, Channel, ChannelHeader, Thread, Window } from 'stream-chat-react';
import { MessageList, MessageInput } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
require('dotenv').config();

import 'stream-chat-react/dist/css/index.css';

const chatClient = new StreamChat(process.env.REACT_APP_CHAT_KEY);
const userToken = process.env.REACT_APP_CHAT_SECRET;

chatClient.setUser(
    {
        id: 'orange-leaf-8',
        name: 'Orange leaf',
        image: 'https://getstream.io/random_svg/?id=orange-leaf-8&name=Orange+leaf'
    },
    userToken,
);

const channel = chatClient.channel('messaging', 'godevs', {
  // add as many custom fields as you'd like
    image: 'https://cdn.chrisshort.net/testing-certificate-chains-in-go/GOPHER_MIC_DROP.png',
    name: 'Talk about Go',
});

const Chat = () => (
    <Chat client={chatClient} theme={'messaging light'}>
    <Channel channel={channel}>
        <Window>
        <ChannelHeader />
        <MessageList />
        <MessageInput />
        </Window>
        <Thread />
    </Channel>
    </Chat>
);

export default Chat;