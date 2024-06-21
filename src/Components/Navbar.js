import React, { useEffect, useContext } from 'react'
import {
  Link,
  useLocation,
} from "react-router-dom";
import UserProfile from './UserProfile'



const Navbar = (props) => {
  let location = useLocation();

  //below line can be used to log the path in the console
  // useEffect(() => {
  //   console.log(location.pathname);
  // }, [location])
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">iNotebook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/About' ? 'active' : ''}`} to="About">About</Link>
            </li>
          </ul>
          {!localStorage.getItem('token') ?
            <form className="d-flex" role="search">
              <Link className={`btn btn-primary mx-2 ${location.pathname === '/login' ? 'disabled' : ''}`} to="/login" role="button">Login</Link>
              <Link className={`btn btn-primary ${location.pathname === '/signup' ? 'disabled' : ''}`} to="/signup" role="button">Signup</Link>
            </form>
            :
            <UserProfile showAlert={props.showAlert}/>
            }
          
        </div>
      </div>
    </nav>
  )
}

export default Navbar

