import React from 'react'
import Cam from "./cam.png"
import Add from "./add.png"
import More from "./more.png"
import { Messages } from './Messages'
import {Input} from './Input'
import { ChatContext } from '../../context/ChatContext'
import { useContext } from "react"

export const Chat = () => {
  const { data,dispatch }=useContext(ChatContext)
  console.log("userdata:",data.user)

  // const [onlineUsers, setOnlineUsers] = useState([]);

  // useEffect(() => {
  //   // Fetch online users from the server or subscribe to a real-time database
  //   // Update the onlineUsers state with the fetched data
  //   // Example:
  //   const fetchOnlineUsers = async () => {
  //     try {
  //       const response = await fetch('http://example.com/api/online-users');
  //       const data = await response.json();
  //       setOnlineUsers(data.onlineUsers);
  //     } catch (error) {
  //       console.error('Error fetching online users:', error);
  //     }
  //   };

  //   // Fetch online users initially and then set up a periodic fetch
  //   fetchOnlineUsers();
  //   const intervalId = setInterval(fetchOnlineUsers, 60000); // Fetch every minute

  //   // Clean up the interval when the component unmounts
  //   return () => clearInterval(intervalId);
  // }, []);


  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span>{data.user?.displayName}</span>
        <div className='chatIcons'>
          <img src={Cam} style={{width: '40px' ,height: '40px'}} alt=""/>
          <img src={Add} style={{width: '40px' ,height: '40px'}} alt=""/>
          <img src={More} style={{width: '40px' ,height: '40px'}} alt=""/>
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}
