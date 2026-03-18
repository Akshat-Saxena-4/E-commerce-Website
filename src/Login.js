import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = login(email, password);
      if (user.designation === 'Admin') navigate('/admin');
      else if (user.designation === 'Shopkeeper') navigate('/shopkeeper');
      else navigate('/client');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-wrapper">
      <h2>Login</h2>
      {error && <p className="error-msg">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email ID</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
        </div>
        <button type="submit" className="btn">Login</button>
      </form>
      <p style={{textAlign: 'center', marginTop: '15px'}}>
        New user? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;