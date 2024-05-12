import React from 'react'

const Message = ({message}) => {
  return (
    <div className='message'>
      <div className="messageInfo">
        <img src="https://up.yimg.com/ib/th?id=OIP.d4bih0HHr0rmqEqb1I1IdAHaHa&pid=Api&rs=1&c=1&qlt=95&w=117&h=117" alt=""/>
        <span>Just Now</span>     {/* If message seen or not and by whom */}
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {/*<img src="https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=600" alt=""/>    {/* What is actual message */}
      </div>
    </div>
  )
};
export default Message;
