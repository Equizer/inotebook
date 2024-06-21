import { useState } from 'react'
import UserContext from "./userContext";
import React from 'react'

function userState(props) {

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const host = 'http://localhost:5000';
  const url = `${host}/api/auth`;

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
    setLoading(false);
    console.log(json);
  }

  // Delete a user 
  const deleteUser = async (userId) => {
    const response = await fetch(`${host}/api/auth/deleteuser/${userId}`, {
      method: 'DELETE',
      headers: {
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    // console.log(json); 
  }



  return (
    <UserContext.Provider value={{ getUserData, deleteUser, loading, setLoading }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default userState


