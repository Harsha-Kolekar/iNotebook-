import React from 'react';
import NoteContext from '../context/notes/NoteContext'

export const About = () => {
  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h1 className="display-4">About iNotebook</h1>
        <p className="lead">Your Personal Digital Notebook in the Cloud</p>
      </div>
      
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h3 className="card-title">Our Mission</h3>
              <p className="card-text">
                iNotebook is designed to help you organize your thoughts, ideas, and important information in one secure place. 
                Access your notes anytime, anywhere, and never lose track of your important information again.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h3 className="card-title">Key Features</h3>
              <ul className="list-unstyled">
                <li className="mb-2">🔒 Secure cloud storage</li>
                <li className="mb-2">📝 Create and edit notes with rich text</li>
                {/* <li className="mb-2">🏷️ Organize with tags and categories</li> */}
                <li className="mb-2">🌐 Access from any device</li>
                <li className="mb-2">🚀 Fast and responsive interface</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h3>Get Started Today</h3>
              <p className="lead">Join thousands of users who trust iNotebook for their note-taking needs</p>
              <div className="mt-3">
                <a href="/signup" className="btn btn-primary me-2">Sign Up Free</a>
                <a href="/login" className="btn btn-outline-primary">Log In</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="text-center mt-5 text-muted">
        <p> {new Date().getFullYear()} iNotebook. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
