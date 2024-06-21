import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState'
import UserState from './context/user/UserState';
import Alert from './components/Alert';
import { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';


function App() {
  
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {

    setAlert({
      message: message,
      type: type
    });

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }
  return (
    <>
    <UserState>
      <NoteState>
        <Router>
          <Navbar showAlert={showAlert}/>
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route exact path="/About" element={<About />} />
              <Route eact path="/login" element={<Login showAlert={showAlert} />} />
              <Route exact path="signup" element={<Signup showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
      </UserState>
    </>
  );
}

export default App;

// TODO:  see if we can implement infinite scroll in the app like when the user has many notes we shouldnt display all of them at once but when the user reaches at the bottom then load more notes and when we fetch more then display a loading bar at the top