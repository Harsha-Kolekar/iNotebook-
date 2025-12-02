import './App.css'
import { Navbar } from './components/Navbar'
// import { Home } from './components/Home'
import Home from './components/Home'
import { About } from './components/About'
import { Signup } from './components/Signup'
import { Login } from './components/Login'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import { useState } from 'react';
import Profile from './components/Profile';
function App() {
  // const isLoggedIn = !!localStorage.getItem("token");
  const [alert, setAlert] = useState(null);
  
  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <div style={{ marginTop: '56px' }}>
          <Alert alert={alert} />
          <div className="container">
            <Routes>
           
              <Route exact path="/login" element={<Login showAlert={showAlert} />} />
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
               {/* <Route path="/" element={isLoggedIn ? <Home showAlert={showAlert} /> : <Navigate to="/login" replace />} /> */}
              <Route exact path="/about" element={<About showAlert={showAlert} />} />
              {/* <Route exact path="/login" element={<Login showAlert={showAlert} />} /> */}
              <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
              <Route exact path="/profile" element={<Profile showAlert={showAlert} />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;
