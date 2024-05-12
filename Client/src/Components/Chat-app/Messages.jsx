import React, { useEffect, useState,useContext } from 'react'
import Message from './Message'
import { ChatContext } from '../../context/ChatContext'
import { onSnapshot,doc } from 'firebase/firestore'
import { db } from '../../firebase'

export const Messages = () => {

  const[messages,setMessages]=useState([])
  const {data}=useContext(ChatContext)

  useEffect(()=>{
    const unSub = onSnapshot(doc(db, "Chat", data.chatId), (doc) => {
      console.log("docdata:",doc.data())
      doc.exists() && setMessages(doc.data().messages);
    });

    return()=>{
      unSub();
    }
  },[data.chatId])

  console.log(messages)

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} />
      ))}
    </div>
  )
}
