import React from 'react'
import "./Chat_main.css"
import { Sidebar } from './Chat-app/Sidebar';
import { Chat } from './Chat-app/Chat';
import { CurrentUsers } from "../context/CurrentUserContext";
import { ChatContextProvider } from '../context/ChatContext';

export const Chat_main = () => {
  return (
  <CurrentUsers>
  <ChatContextProvider>
    <div className='chat_main'>
      <div className='container'>
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  </ChatContextProvider>
  </CurrentUsers>
  )
}
export default Chat_main;
