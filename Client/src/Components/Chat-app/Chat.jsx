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
