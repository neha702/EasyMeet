import React from 'react';
import Register from './Components/Register';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import './App.css'
import Login from './Components/Login';
import Home from './Components/Home';
import Chat_app from './Components/Chat_main';
import Video_main from './Components/Video_main';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/home/chat_main' element={<Chat_app />} />
          <Route exact path='/home/video_chat' element={<Video_main />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;