import React from 'react';
import ReactLogo from './undraw_remotely_2j6y.svg';
import { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Icon } from 'react-icons-kit'
import {eye} from 'react-icons-kit/feather/eye'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import { doc, setDoc } from "firebase/firestore"; 
import {v4 as uuidv4} from 'uuid'
import {db} from "../firebase";


const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resp, setResp] = useState("");
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

  const register = async (e) => {
    e.preventDefault();
    console.log(db)
    setDisable("submitted")

    const passwordPattern=/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/
    if (!passwordPattern.test(password)){
      setError("Password requirements: Minimum 8 characters,at least one number,at least one letter,at least one special character")
      setUsername('');
      setPassword('');
      setDisable('typing')
      return;
    }

    var uid =uuidv4()
    var user = { "username": username, "password": password,"uid": uid};
    var servers = {
      method: 'post',
      url: 'http://localhost:8080/register',
      data: user,
    };
    axios(servers)
      .then(async function (response) {
        const userChatsRef=doc(db,'usersChat',uid)
        await setDoc(userChatsRef,{})
        console.log("Added to DB");
        window.location.href = '/home';
        setError('');
        setUsername('');
        setPassword('');
        setDisable('typing')
        console.log("Username and password cleared.")
      })
      .catch(function (error) {
        if (error.response){
            console.log(error.response.data)
            setError(error.response.data);
        }else{
          console.log(error)
        }
        console.log("Couldn't add to DB");
        setUsername('');
        setPassword('');
        setDisable('typing')
        console.log("Username and password cleared.")
      });
  };
  return (
    //This is the area where you paste your HTML codes
    <>
      <Navbar />
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
                    <h3>Sign Up</h3>
                    <br />
                    <p className="mb-4">An ideal meeting platform for students and teachers.</p>
                    <p className="mb-4">Sign up to enjoy.</p>

                  </div >
                  <form onSubmit={register}>
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

                    <div className="d-flex mb-5 align-items-center">
                      <span className="ml-auhref"><a href="/login" className="forgot-pass">Already a user? Click here.</a></span>
                    </div>
                    <input type="submit" value="Register" class="btn btn-block btn-custom" data-toggle="modal" data-target="#exampleModal" disabled={username.length==0 || password.length<8 || disable==='submitted'}/>
                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">{error == '' ? resp : error}</h5>
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
    </>
  );
};
export default Register;

