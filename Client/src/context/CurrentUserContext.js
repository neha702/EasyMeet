import React, { createContext, useContext, useEffect, useState,useRef } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const CurrentUsers = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async() => {
      var servers={
        method:'get',
        url:"http://localhost:8080/retrieveUserData",
        withCredentials: true
      }

     await axios(servers).then(function(response){
      setCurrentUser(response.data);
      setLoading(false);
    }). catch (function (error) {
        console.error(error);
        setLoading(false);
      }
    );
  }

  if (Object.keys(currentUser).length === 0) {
  fetchData();
  }
  
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{currentUser,loading}}>
      <div>
        {
        !loading?children:<p>Loading...</p>
        }
      </div>
    </AuthContext.Provider>
  );
};
