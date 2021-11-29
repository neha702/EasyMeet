import React, { useContext } from 'react';
//Used for styling
import { Grid, Typography, Paper, makeStyles } from '@material-ui/core';

import { SocketContext } from '../Socket_context';

const useStyles = makeStyles((theme) => ({
  video: {
    width: '550px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
  },
}));

const Video_player = () => {
  //Following info extracted from Socket context
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
  const classes = useStyles();
  var user = localStorage.getItem('username');
  return (
    <Grid container className={classes.gridContainer}>
      {/* Our video */}
      {/* Only if stream is there then show our screen */}
      {stream && (
        <Paper className={classes.paper}>
          {/* Half our video image ,half user video image in middle width devices */}
          <Grid item xs={12} md={6}>
            {/* <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>  */}
            {/* Can mute our own video */}
            <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
          </Grid>
        </Paper>
      )}
      {/* User's video */}
      {/* Only if call accepted and call not ended  then show user's screen */}
      {callAccepted && !callEnded && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            {/* <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography> */}
            {/* Mute property wont be there */}
            <video playsInline ref={userVideo} autoPlay className={classes.video} />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default Video_player;