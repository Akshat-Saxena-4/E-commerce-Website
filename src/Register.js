import React, { useState, useRef } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, Link } from 'react-router-dom';

// Make sure this file name matches EXACTLY what is in your src folder
import AstronautImage from './astronaut.png'; 

const Register = () => {
  // ... (keep all your state and logic code the same) ...
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('Client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();
  const cardRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) { setError("Please fill all fields"); return; }
    try { register(name, designation, email, password); alert("Success!"); navigate('/login'); } 
    catch (err) { setError(err.message); }
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; const y = e.clientY - rect.top;
    const centerX = rect.width / 2; const centerY = rect.height / 2;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${(y-centerY)/15}deg) rotateY(${(centerX-x)/15}deg) scale(1.02)`;
  };
  const handleMouseLeave = () => { if(cardRef.current) cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'; };

  return (
    <div className="form-wrapper" ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      
      {/* USING YOUR LOCAL FILE */}
      <img src={AstronautImage} alt="Astronaut" className="peeking-image-top" />

      <div className="hero-img">
        <svg width="50" height="50" viewBox="0 0 24 24" fill="#ff00de">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      </div>
      <h2>Sign Up</h2>
      {error && <p className="error-msg">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group"><label>Full Name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" /></div>
        <div className="form-group"><label>Designation</label><select value={designation} onChange={(e) => setDesignation(e.target.value)}><option value="Client">Client</option><option value="Shopkeeper">Shopkeeper</option><option value="Admin">Admin</option></select></div>
        <div className="form-group"><label>Email ID</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" /></div>
        <div className="form-group"><label>Password</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********" /></div>
        <button type="submit" className="btn btn-success">Register</button>
      </form>
      <p className="link-style">Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};
export default Register;