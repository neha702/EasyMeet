import React from 'react'
import { ChatEngine } from 'react-chat-engine'
const projectID = "823247ef-1b1e-425f-bdaf-770785676dea";
import ChatFeed from './Chat-app/ChatFeed';
import Login from './Login'
import "./Chat_main.css"
export const Chat_main = () => {
  if (!localStorage.getItem('username')) return <Login />;
  // console.log(localStorage.getItem('username'));
  return (
    <ChatEngine
      height="100vh"
      projectID={projectID}
      userName={localStorage.getItem('username')}
      userSecret={localStorage.getItem('password')}
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
    />
  )
}
export default Chat_main;
