import React, {useEffect} from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  
/*************  ✨ Windsurf Command 🌟  *************/
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/login');
  }
/*******  9ca9ced2-abc9-4fdb-9f2f-712609dc4151  *******/
  
  const handleProfile = () => {
    navigate('/profile');
  }
  
  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
    // Highlight the active link based on the current location
  }, [location]);
  
  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">iNotebook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={location.pathname === '/' ? 'nav-link active' : 'nav-link'} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={location.pathname === '/about' ? 'nav-link active' : 'nav-link'} to="/about">About</Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex">
                <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
              </form>
            ) : (
              <>
              <button className="btn btn-primary mx-2" onClick={handleProfile}>Profile</button>
              <button className="btn btn-primary mx-2" onClick={handleLogout}>Logout</button>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}
