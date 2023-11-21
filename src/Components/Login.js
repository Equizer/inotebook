import React, { useState }from 'react'

const Login = () => {
  const [credentials, setCredentials] = useState({email: "", password: ""})
  const hadleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password})
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //redirect
    }
    else {
      alert("Invalid email or password");
    }
  }


  const onChange = (event) => {
    setCredentials({...credentials, [event.target.name] : event.target.value});
  }
  return (
    <div>
      <form  onSubmit={hadleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" value={credentials.email} id="email" aria-describedby="emailHelp" name="email" onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" value={credentials.password} id="password" name="password" onChange={onChange}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Login
