import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/CurrentUserContext";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../firebase";

export const Chats = () => {

  const[chats,setChats]=useState([]);

  const { currentUser,loading } = useContext(AuthContext);
  const { data,dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        console.log(doc)
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    if (Object.keys(chats).length === 0){
        currentUser.uid && getChats();
    }

  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
    {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
      <div
        className="userChat"
        key={chat[0]}
        onClick={() => handleSelect(chat[1].userInfo)}
      >
        <img src="https://up.yimg.com/ib/th?id=OIP.d4bih0HHr0rmqEqb1I1IdAHaHa&pid=Api&rs=1&c=1&qlt=95&w=117&h=117"alt="" />
        <div className="userChatInfo">
          <span>{chat[1].userInfo.displayName}</span>
          <p>{chat[1].lastMessage?.text}</p>
        </div>
      </div>
    ))}
  </div>
  )
}
