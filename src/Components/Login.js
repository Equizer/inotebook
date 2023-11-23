import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom' //note that useHistory hook has been replaced with useNavigate hook after version 6 of react-touter-dom and now we dont need to use .() to use this hook we can just do it like that navigate(path) if we stored the hook in the variable named navigate
import NoteContext from '../context/notes/noteContext';

const Login = (props) => {

  const context = useContext(NoteContext);

  const {getUserData} = context;

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const hadleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });

    const json = await response.json();

    if (json.success) {
      //save the auth token and redirect
      localStorage.setItem('token', json.authToken);
      getUserData();
      navigate('/');
      props.showAlert('Logged In!', 'success');
    }
    else {
      props.showAlert('Invalid email or password', 'danger');
    }

  }


  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }

  return (
    <div className="mt-3">
      <h2>Login to continue with iNotebook</h2>
      <form onSubmit={hadleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" value={credentials.email} id="email" aria-describedby="emailHelp" name="email" onChange={onChange} required  />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" value={credentials.password} id="password" name="password" onChange={onChange} required minLength={5} />
        </div>
        <button disabled={credentials.password.length<5} type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  )
}

export default Login
