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
    }, 2000);
  }
  useEffect(() => {
    showAlert('This string was passed by a function', 'primary');
  }, []);
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/About" element={<About showAlert={showAlert}/>} />
              <Route eact path="/login" element={<Login />} />
              <Route exact path="signup" element={<Signup />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
