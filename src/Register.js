import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('Client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) {
      setError("Please fill all fields");
      return;
    }
    try {
      register(name, designation, email, password);
      alert("Registration Successful! Please login.");
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-wrapper">
      <h2>Sign Up</h2>
      {error && <p className="error-msg">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="John Doe" 
          />
        </div>
        
        {/* THIS IS WHERE YOU CHOOSE ADMIN/SHOPKEEPER/CLIENT */}
        <div className="form-group">
          <label>Designation (Select Role)</label>
          <select value={designation} onChange={(e) => setDesignation(e.target.value)}>
            <option value="Client">Client</option>
            <option value="Shopkeeper">Shopkeeper</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div className="form-group">
          <label>Email ID</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="john@example.com" 
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="********" 
          />
        </div>

        <button type="submit" className="btn">Register</button>
      </form>
      <p style={{textAlign: 'center', marginTop: '15px'}}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;