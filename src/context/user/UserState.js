import { useState } from 'react'
import UserContext from "./userContext";
import React from 'react'

function userState(props) {

  const [user, setUser] = useState({});
  
  const host = 'http://localhost:5000';

  // Get user data
  const getUserData = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: 'GET',
      headers: {
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setUser(json);
    localStorage.setItem('user', JSON.stringify(json));
    console.log(json);
  }

  return (
    <UserContext.Provider value={{ getUserData }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default userState


