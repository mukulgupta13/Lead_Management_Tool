import React, { useState } from 'react';
import './LoginForm.css'; // Importing the CSS file
import { userLogin } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Both fields are required');
    } else {
      // Process login here
      console.log('Email:', email, 'Password:', password);
      const data = {email, password};
      userLogin(data).then((res)=>{
        console.log("ssdettertet",res.data)
            localStorage.setItem('auth-token', res.data.token);
            navigate('/lead-list');
      }).catch((err)=>{
        setError(err.response.data.message);
      })
      setError('');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your email"
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter your password"
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Login</button>
        <p>Create New Account</p>
        <button onClick={()=>navigate('/register')}>Create New Account</button>
      </form>
    </div>
  );
};

export default Login;
