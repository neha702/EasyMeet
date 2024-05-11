import React from 'react'
import ReactLogo from './undraw_remotely_2j6y.svg';
import { useState } from 'react';
const projectID = "823247ef-1b1e-425f-bdaf-770785676dea"
import axios from 'axios'
import Navbar from './Navbar';
import { Icon } from 'react-icons-kit'
import {eye} from 'react-icons-kit/feather/eye'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'


export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [type,setType]=useState("password");
  const [visible,setVisibility]=useState(eyeOff);
  const [disable,setDisable]=useState('typing');

  const handleToggle=()=>{
    if(type==="password"){
      setVisibility(eye)
      setType('text')
    }else{
      setVisibility(eyeOff)
      setType("password")
    }
  }

  const login = (e) => {
    e.preventDefault(e);
    setDisable("submitted")
    var user = { "username": username, "password": password };
    var servers = {
      method: 'post',
      url: 'http://localhost:8080/login',
      data: user,
      withCredentials:true
    };
    axios(servers)
      .then(function (response) {
        console.log('Extracted from DB')
        window.location.href = '/home';
        setError('')
        setUsername('')
        setPassword('')
        setDisable('typing')
      })
      .catch(function (error) {
        setError('Oops, incorrect credentials.');
        console.log('Couldnt find in DB')
        setUsername('')
        setPassword('')
        setDisable('typing')
      });
  };
  return (
    <>
      <Navbar />
      <div>
        <div className="content">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <img src={ReactLogo} alt="Image" className="img-fluid" />
              </div>
              <div className="col-md-6 contents">
                <div className="row justify-content-center">
                  <div className="col-md-8">
                    <div className="mb-4">
                      <h3>Log In</h3>
                      <br />
                      <p className="mb-4">An ideal meeting platform for students and teachers.</p>
                      <p className="mb-4">Login to enjoy.</p>
                    </div>
                    <form onSubmit={login}>
                      <div className="form-group first">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="username" value={username} onChange={(e) => {
                          setUsername(e.target.value);
                        }} required />
                      </div>
                      <br />
                      <div className="form-group last mb-4">
                        <label htmlFor="password">Password</label>
                        <input type={type} className="form-control" id="password" value={password} onChange={(e) => {
                          setPassword(e.target.value);
                        }} required />
                        <span class="shift-right" onClick={handleToggle}><Icon icon={visible} size={25}/></span>
                      </div>
                      <input type="submit" value="Log In" class="btn btn-block btn-custom" data-toggle="modal" data-target="#exampleModal"  disabled={username.length==0 || password.length<8 || disable==='submitted'}/>
                      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">{error == '' ? 'Loading' : error}</h5>
                              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                          </div>
                        </div>
                      </div>

                    </form>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Login;