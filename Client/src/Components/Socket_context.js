import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
const SocketContext = createContext();

const socket = io('http://localhost:3001');

//Functions for our video-chat app
const ContextProvider = ({ children }) => {
  //Provide the use_states
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    //When page reloads,permission taken
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream); //set stream to current stream

        myVideo.current.srcObject = currentStream; //Set myVideo to currentstream
      });

    socket.on('me', (id) => setMe(id)); //Listen to me action which been emitted from backend,to get specific id
    socket.on('callUser', ({ from, name: callerName, signal }) => { //Listening to call user action from backend
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []); //Empty dependency array at end

  const answerCall = () => {
    setCallAccepted(true); //When answering call, set true the callaccepted
    //Create a new peer initiated to false
    const peer = new Peer({ initiator: false, trickle: false, stream });
    //When signal is recieved
    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream; //Other person's video stream is initialised
    });

    peer.signal(call.signal);

    connectionRef.current = peer; // connection to the current peer
  };
  //which id we calling in brackets
  const callUser = (id) => {
    //Create a peer (me) and thatswhy we set initiator to true
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      //We emit calluser as we are the one calling
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
    //Set call accepted as true,listen to call accepted action
    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    //Once call ended ,destroy connectionref
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };
  //All that we pass will be accessible to Video-call components
  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
    }}
    >
      {children}
      {/* Wrapped into children */}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };