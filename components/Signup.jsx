import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"", email: "", password: "" ,cpassword: "" });
  const navigate = useNavigate();
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Get and trim password fields
    const password = e.target.password.value.trim();
    const cpassword = e.target.cpassword.value.trim();
    
    // Check if password is empty or contains only spaces
    if (!password) {
      props.showAlert("Password cannot be empty", "warning");
      return;
    }
    
    // Check if passwords match
    if (password !== cpassword) {
      props.showAlert("Passwords do not match", "danger");
      return;
    }
    
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          name: e.target.name.value.trim(),
          email: e.target.email.value.trim(),
          password: password,
      })
    });
    
    const json = await response.json();
    console.log(json);
    if(json.success) {
      localStorage.setItem('token', json.authtoken);
      navigate('/');
      props.showAlert("Account created successfully", "success");
    }
    else {
      props.showAlert("Invalid Credentials", "danger");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div className="container" style={{ marginTop: '100px' }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Create an account to continue to iNotebook</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    name="name" 
                    onChange={onChange} 
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    name="email" 
                    onChange={onChange} 
                    aria-describedby="emailHelp"
                    required
                  />
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="password" 
                    name="password" 
                    onChange={onChange} 
                    minLength={5} 
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="cpassword" 
                    name="cpassword" 
                    onChange={onChange} 
                    minLength={5} 
                    required
                  />
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
