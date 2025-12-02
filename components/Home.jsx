import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Notes from './Notes';

function Home(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAddNote, setShowAddNote] = useState(false);

  useEffect(() => {
    // Check for existing token
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    // Add beforeunload event listener for tab close
    const handleBeforeUnload = () => {
      localStorage.removeItem('token');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleNewNoteClick = () => {
    setShowAddNote(true);
    const event = new CustomEvent('showAddNote', { detail: true });
    document.dispatchEvent(event);
    
    setTimeout(() => {
      const notesSection = document.getElementById('notes-section');
      if (notesSection) {
        notesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // If not logged in, only show the hero section with Get Started button
  if (!isLoggedIn) {
    return (
      <div className="min-vh-100 bg-light">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 order-lg-2 mb-4 mb-lg-0">
              <img 
                src="https://img.freepik.com/free-vector/notes-concept-illustration_114360-1507.jpg" 
                alt="Notes and notebook illustration"
                className="img-fluid rounded shadow"
              />
            </div>
            <div className="col-lg-6 order-lg-1">
              <h1 className="display-5 fw-bold mb-4">Capture Your Thoughts</h1>
              <p className="lead text-muted mb-4">
                A simple, beautiful way to organize your notes and ideas. Access them anywhere, anytime.
              </p>
              <div className="d-flex gap-3">
                <Link to="/login" className="btn btn-primary btn-lg px-4">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If logged in, show the full interface
  return (
    <div className="min-vh-100 bg-light">
      {/* Hero Section */}
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-lg-6 order-lg-2 mb-4 mb-lg-0">
            <img 
              src="https://img.freepik.com/free-vector/notes-concept-illustration_114360-1507.jpg" 
              alt="Notes and notebook illustration"
              className="img-fluid rounded shadow"
            />
          </div>
          <div className="col-lg-6 order-lg-1">
            <h1 className="display-5 fw-bold mb-4">Capture Your Thoughts</h1>
            <p className="lead text-muted mb-4">
              A simple, beautiful way to organize your notes and ideas. Access them anywhere, anytime.
            </p>
            <div className="d-flex gap-3">
              <button 
                className="btn btn-primary btn-lg px-4"
                onClick={handleNewNoteClick}
              >
                <i className="bi bi-plus-lg me-2"></i>
                New Note
              </button>
              <Link to="/profile" className="btn btn-outline-secondary btn-lg px-4">
                <i className="bi bi-person me-2"></i>
                Profile
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="container py-4" id="notes-section">
        <Notes showAlert={props.showAlert} showAddNoteInitially={showAddNote} />
      </div>
    </div>
  );
}

export default Home;