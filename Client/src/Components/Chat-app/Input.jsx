import React, { useContext,useState } from 'react'
import Img from "./img.png"
import Attach from "./attach.png"
import Send from "./communication.png"
import { updateDoc,doc,serverTimestamp,Timestamp,arrayUnion } from 'firebase/firestore'
import { db } from '../../firebase'
import { AuthContext } from '../../context/CurrentUserContext'
import { ChatContext } from '../../context/ChatContext'
import { v4 as uuid } from "uuid";

export const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const {currentUser,loading} =useContext(AuthContext);
  const {data,dispatch} =useContext(ChatContext);

  const handleSendKey= async()=>{
    await updateDoc(doc(db, "Chat", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });
    await updateDoc(doc(db, "usersChat", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "usersChat", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  }

  const handleSend=(e)=>{
   e.code==="Enter" && handleSendKey();
  }

  return (
    <div className='input'>
      <input type="text" id="myInput" placeholder='Message something...'  onKeyDown={handleSend} onChange={(e) => setText(e.target.value)}
        value={text}/>
      <div className='send'>
        <img src={Attach} alt=""/>                                 {/* File attachment  */}
        <input type="file" style={{display:"none"}} id="file" onChange={(e) => setImg(e.target.files[0])}/>
        <label htmlFor='file'>
          <img src={Img} alt=""/>                                  {/* Image attachment  */}
        </label>
        <button id="sendButton" className="imageButton" disabled={text.trim() === ""} onClick={handleSendKey}>
        <img src={Send} alt="Button"/>
        </button>
      </div>
    </div>
  )
}
