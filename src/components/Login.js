import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../css/login.css'

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();
    const dispatch = useDispatch();
    // useEffect(() => {
    //     // Check for login status on component mount
    //     const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    //     if (isLoggedIn) {
    //         // User is already logged in, redirect to the admin page
    //         navigate('/admin/updateBanner');
    //     }
    // }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        if (json.success) {
            dispatch({
                type: "ADNIN_LOGIN",
                userId: json._id,
                name: json.name,
                e_mail: json.email,
                token: json.authToken,
                campus: json.campus,
                role: json.role,
                isLoggedIn: true
            })
            props.showAlert("success", " : Logged In Successfully")
            navigate('/admin/updateBanner');
        }
        else {
            props.showAlert("danger", " : Invalid Credentials")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='login-container'>
            <div className='login' >
                <h2>Login as an Admin</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-3 mt-4">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" value={credentials.email} onChange={onChange} name='email' aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name='password' />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login