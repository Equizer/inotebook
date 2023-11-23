import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import NoteContext from '../context/notes/noteContext';

const Signup = (props) => {

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  const navigate = useNavigate();
  const context = useContext(NoteContext);
  const { getUserData } = context;
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
    });
    
    const json = await response.json();

    if (json.success) {
      localStorage.setItem('token', json.authToken);
      getUserData();
      navigate('/');
      props.showAlert('Signed up!', 'success')
    }
    else {
      props.showAlert('A user with this email already exists', 'danger');
      navigate('/login');
    }
  }


  return (
    <div className="container mt-5">
      <h2>Create an account to use iNotebook</h2>
      <form className="my-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={credentials.name} aria-describedby="emailHelp" onChange={onChange} required minLength={2} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" onChange={onChange} required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name="password" id="password" value={credentials.password} onChange={onChange} required minLength={5} />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label"> Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" value={credentials.cpassword} onChange={onChange} required minLength={5} />
        </div>
        <button disabled={credentials.name.length < 2 || credentials.password.length < 5 || credentials.cpassword.length < 5} type="submit" className="btn btn-primary">Signup</button>
      </form>
    </div>
  )
}

export default Signup
