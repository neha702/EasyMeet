import { useContext } from 'react';
import React from 'react'
import { AuthContext } from '../../context/CurrentUserContext'

const Message = ({message}) => {

  const {currentUser,loading} =useContext(AuthContext);

  return (
    <div className='message'>
      <div className="messageInfo">
        <img src="https://up.yimg.com/ib/th?id=OIP.d4bih0HHr0rmqEqb1I1IdAHaHa&pid=Api&rs=1&c=1&qlt=95&w=117&h=117" alt=""/>
        <span>Just Now</span>     {/* If message seen or not and by whom */}
      </div>
      <div className="messageContent">
        <div className={(message.senderId === currentUser.uid)?'owner':'sender'}>
           <p>{message.text}</p>    {/* What is actual message */}
        </div>
      </div>
    </div>
  )
};
export default Message;
