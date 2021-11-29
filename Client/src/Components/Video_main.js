import React from 'react'
//Styling components
import { Typography, AppBar } from '@material-ui/core';
//styling component
import { makeStyles } from '@material-ui/core/styles';
import Video_player from './Video-call/Video_player';
import Options from './Video-call/Options';
import Notifications from './Video-call/Notifications';
//Return object giving the theme(styling purposes)
const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 450px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',
    border: '2px solid black',

    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  image: {
    marginLeft: '15px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#887BD7'
  },
}));
const Video_main = () => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography variant="h2" align="center">Video-Call</Typography>
      </AppBar>
      <Video_player />
      <Options />
      <Notifications />
    </div>
  );
}
export default Video_main;