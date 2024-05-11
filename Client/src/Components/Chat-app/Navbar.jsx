import React,{useContext} from 'react'
import { AuthContext} from "../../context/CurrentUserContext";

export const Navbar = () => {
  const { currentUser,loading } = useContext(AuthContext);
  return (
    <div  className='navbar'>
        <span className='logo'>EasyMeet Chat</span>
        <div className='user'>
            <img src="https://up.yimg.com/ib/th?id=OIP.d4bih0HHr0rmqEqb1I1IdAHaHa&pid=Api&rs=1&c=1&qlt=95&w=117&h=117" alt=""/>
            <span>{currentUser.username}</span>
            <button>logout</button>
        </div>
    </div>
  )
}
