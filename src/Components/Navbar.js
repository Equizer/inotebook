import React, { useEffect, useContext } from 'react'
import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";
import NoteContext from '../context/notes/noteContext';

const Navbar = () => {
  let location = useLocation();
  let navigate = useNavigate();
  const context = useContext(NoteContext);
  const { user, setUser } = context;
  const localStorageUser = JSON.parse(localStorage.getItem('user'))
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  }


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
          {localStorageUser ? <span className="badge text-bg-dark" style={{ height: '25px', fontSize: '14px' }}>{localStorageUser.name}</span> : ''}
          {!localStorage.getItem('token') ?
            <form className="d-flex" role="search">
              <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
              <Link className="btn btn-primary" to="/signup" role="button">Signup</Link>
            </form>
            :
            <button onClick={handleLogout} className="btn btn-outline-primary"><i className="fa-solid fa-right-from-bracket"></i></button>}

        </div>
      </div>
    </nav>
  )
}

export default Navbar

