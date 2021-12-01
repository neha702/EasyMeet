import React from 'react';
import ReactLogo from './undraw_remotely_2j6y.svg';
import { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
const projectID = "823247ef-1b1e-425f-bdaf-770785676dea"
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resp, setResp] = useState("");


  const register = (e) => {
    e.preventDefault();
    var data = { "username": username, "secret": password };
    var user = { "username": username, "password": password };
    var config = {
      method: 'post',
      url: 'https://api.chatengine.io/users/',
      data: data,
      headers: {
        'PRIVATE-KEY': '197a491b-8169-4d40-b21f-b7cdbe2f5216'
      }
    };
    var servers = {
      method: 'post',
      url: 'http://localhost:3001/register',
      data: user,
    };
    axios(config)
      .then(function (response) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        setResp('Registration done.Click on already a user to get to app.')
        setError('')
        setUsername('');
        setPassword('');
      })
      .catch(function (error) {
        setError('Oops something went wrong');
        localStorage.clear();
      });
    axios(servers)
      .then(function (response) {
        console.log("Added to DB");
      })
      .catch(function (error) {
        console.log("Couldn't add to DB");
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
                      <input type="text" className="form-control" id="username" onChange={(e) => {
                        setUsername(e.target.value);
                      }} required />
                    </div>
                    <br />
                    <div className="form-group last mb-4">
                      <label htmlFor="password">Password</label>
                      <input type="password" className="form-control" id="password" onChange={(e) => {
                        setPassword(e.target.value);
                      }} required />

                    </div>

                    <div className="d-flex mb-5 align-items-center">
                      <span className="ml-auhref"><a href="/login" className="forgot-pass">Already a user? Click here.</a></span>
                    </div>
                    <input type="submit" value="Register" class="btn btn-block btn-custom" data-toggle="modal" data-target="#exampleModal" />
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
