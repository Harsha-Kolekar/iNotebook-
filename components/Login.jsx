import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Trim the password to remove leading/trailing spaces
        const password = e.target.password.value.trim();
        
        // Check if password is empty or contains only spaces
        if (!password) {
            props.showAlert("Password cannot be empty", "warning");
            return;
        }
        
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: e.target.email.value.trim(),
                password: password
            })
        });
        const json = await response.json();
        console.log("Login response:", json);
        if(json.success) {
            localStorage.setItem('token', json.authToken);
            props.showAlert("Logged in successfully", "success");
            navigate('/');
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
                            <h2 className="card-title text-center mb-4">Login to iNotebook</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        id="email" 
                                        name="email" 
                                        value={credentials.email} 
                                        onChange={onChange} 
                                        aria-describedby="emailHelp"
                                        required
                                    />
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        id="password" 
                                        name="password" 
                                        value={credentials.password} 
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                                <p className="text-center mt-3">
                                    Don't have an account? <a href="/signup" className="text-decoration-none">Sign up</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
