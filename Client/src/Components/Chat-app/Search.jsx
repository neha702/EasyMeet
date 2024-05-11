import React, { useContext,useState } from 'react'
import { getDoc, setDoc, updateDoc ,doc,serverTimestamp} from 'firebase/firestore';
import { db } from '../../firebase';
import { AuthContext} from "../../context/CurrentUserContext";
import axios from 'axios'


export const Search = () => {
  const [username,setUsername]=useState("")
  const [user,setUser]=useState(null)
  const [err,setErr]=useState(false)
  const { currentUser,loading } = useContext(AuthContext);

  const handleSearch= async ()=>{
    var user = { "displayName":username };
    var servers = {
      method: 'post',
      url: 'http://localhost:8080/getUsersData',
      data: user
    };
    await axios(servers).then(function(response){
      if (response.statusText=='OK'){
        console.log(response.data)
          setUser(response.data)
      }else{
          console.error("User data could not be retrieved successfully.")
          setErr(true)
      }
  }).catch(function(error){
          console.error("Some exception or network error occured.",error)
  })
  };

  const handleKey=(e)=>{
    e.code === "Enter" && handleSearch();
  };

  const handleSelect=async()=>{
    //check whether the chat group exists ,if not create new one

    const combinedId =
    currentUser.uid > user.uid
      ? currentUser.uid+ user.uid
      : user.uid + currentUser.uid;

      console.log(combinedId)

      try{
        const res=await getDoc(doc(db,"Chat",combinedId))
        if (!res.exists()){
          //create a chat in chats collection
          await setDoc(doc(db,"Chat",combinedId),{messages:[]})
      
          //create users chat
          await updateDoc(doc(db,"usersChat",currentUser.uid), {
            [combinedId + ".userInfo"]: {
              uid: user.uid,
              displayName: user.username,
            },
            [combinedId + ".date"]: serverTimestamp(),
          })

          await updateDoc(doc(db,"usersChat",user.uid), {
            [combinedId + ".userInfo"]: {
              uid: currentUser.uid,
              displayName: currentUser.username,
            },
            [combinedId + ".date"]: serverTimestamp(),
          })
          setUser(null)
          setUsername("")
        }
      }catch{err}
  }
  return (
    <div className='search'>
      <div className='searchForm'>
        <input type="text" placeholder='Find a user...' onKeyDown={handleKey} onChange={e=>setUsername(e.target.value)}/>
      </div>
      {err && <span>User not found</span>}
      {user && <div className='userChat' onClick={handleSelect}>
        <img src="https://up.yimg.com/ib/th?id=OIP.d4bih0HHr0rmqEqb1I1IdAHaHa&pid=Api&rs=1&c=1&qlt=95&w=117&h=117" alt=""/>
        <div className='userChatInfo'>
          <span>{username}</span>
        </div>
      </div>}
    </div>
  )
}
