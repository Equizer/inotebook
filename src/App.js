import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState'
import Alert from './components/Alert';
import { useEffect, useState } from 'react';
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
    }, 1500);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route exact path="/About" element={<About />} />
              <Route eact path="/login" element={<Login showAlert={showAlert}/>} />
              <Route exact path="signup" element={<Signup showAlert={showAlert}/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;

// TODO: after we are done with making this app we will add a feature so that a user can add his age as well when he is signing up and also a feature to delete the account of the user also we can make an endpoint that will delete all the notes by one click