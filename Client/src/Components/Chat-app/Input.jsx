import React, { useContext,useState } from 'react'
import Img from "./img.png"
import Attach from "./attach.png"
import Send from "./communication.png"
import { updateDoc,doc,serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase'
import { AuthContext } from '../../context/CurrentUserContext'
import { ChatContext } from '../../context/ChatContext'

export const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const {currentUser,loading} =useContext(AuthContext)
  const data =useContext(ChatContext)

  const handleSend=async()=>{

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp,
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  }
  return (
    <div className='input'>
      <input type="text" placeholder='Type something...'  onChange={(e) => setText(e.target.value)}
        value={text}/>
      <div className='send'>
        <img src={Attach} alt=""/>                                 {/* File attachment  */}
        <input type="file" style={{display:"none"}} id="file" onChange={(e) => setImg(e.target.files[0])}/>
        <label htmlFor='file'>
          <img src={Img} alt=""/>                                  {/* Image attachment  */}
        </label>
        {/*<button>Send</button>*/}
        <img src={Send} alt="" onClick={handleSend}/>
      </div>
    </div>
  )
}
