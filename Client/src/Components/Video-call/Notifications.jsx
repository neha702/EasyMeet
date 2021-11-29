import React from 'react'
import { useContext } from 'react';
import { Button } from '@material-ui/core';

import { SocketContext } from '../Socket_context'

const Notifications = () => {
  //Parameters from socket-context
  var user = localStorage.getItem('username');
  const { answerCall, call, callAccepted } = useContext(SocketContext);
  return (
    <>
      {/* JSX to show when there is call and its not accepted */}
      {call.isReceivingCall && !callAccepted && (
        <div className={{ display: 'flex', justifyContent: 'space-around' }}>
          <h1>{user} is calling:</h1>
          {/* Button to basically answer the call */}
          <Button variant="contained" color="primary" onClick={answerCall}>
            Answer
          </Button>
        </div>
      )}
    </>
  );
}
export default Notifications;