import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Profile = (props) => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          props.showAlert("Please log in to view your profile", "warning");
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:5000/api/auth/getuser', {
          method: 'POST',  
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Oops, we haven't got JSON!");
        }

        const data = await response.json();
        
        if (data && (data.name || data.email)) {
          setUser({
            name: data.name || 'User',
            email: data.email || 'No email provided'
          });
        } else {
          throw new Error("Invalid user data received");
        }
      } catch (error) {
        console.error("Error in fetchUserProfile:", error);
        setError("Failed to load profile. Please try again later.");
        props.showAlert("Failed to load profile", "danger");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate, props]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger">
          <h4 className="alert-heading">Error Loading Profile</h4>
          <p>{error}</p>
          <button 
            className="btn btn-primary mt-2"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Get first letter of name for avatar
  const getInitial = () => {
    return user.name ? user.name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <div className="container" style={{ paddingTop: '100px' }}>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm mb-5">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <div 
                  className="mx-auto rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" 
                  style={{ width: '100px', height: '100px', fontSize: '48px' }}
                >
                  {getInitial()}
                </div>
                <h2 className="mt-3 mb-0">{user.name}</h2>
                <p className="text-muted">Welcome to your profile</p>
              </div>
              
              <div className="profile-details">
                <div className="mb-3">
                  <h5 className="text-muted mb-2">Email Address</h5>
                  <p className="p-2 bg-light rounded">
                    <i className="bi bi-envelope me-2"></i>
                    {user.email}
                  </p>
                </div>
                
                <div className="mb-3">
                  <h5 className="text-muted mb-2">Member Since</h5>
                  <p className="p-2 bg-light rounded">
                    <i className="bi bi-calendar3 me-2"></i>
                    {new Date().toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              
              <div className="d-grid gap-2 d-md-flex justify-content-md-center mt-4">
                <button 
                  className="btn btn-primary me-md-2"
                  onClick={() => navigate('/')}
                >
                  <i className="bi bi-house-door me-2"></i>
                  Back to Home
                </button>
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    localStorage.removeItem('token');
                    // Clear any user data from state
                    setUser({ name: '', email: '' });
                    // Show success message
                    props.showAlert("Logged out successfully", "success");
                    // Wait a moment for the alert to show, then navigate
                    setTimeout(() => {
                      navigate('/login');
                      // Force a full page reload to reset the app state
                      window.location.reload();
                    }, 500);
                  }}
                >
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;