import React, { useState } from 'react';
import './UserForm.css';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/api';

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form data here, e.g., send it to an API
    createUser(formData).then((res) => {
        navigate('/');
    }).catch((err) => {
        setError(err.response.data.message);
    })
    console.log('User Data:', formData);
  };

  return (
    <div className="form-container">
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="role">Role</label>
          <select
            name="role"
            id="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Create User</button>
        <p>Already have an account:</p>
        <button onClick={()=>navigate('/')}>Go To Login</button>
      </form>
    </div>
  );
};

export default UserForm;
