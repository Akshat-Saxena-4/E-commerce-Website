import React, { useState, useRef } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const cardRef = useRef(null);

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

  // Wobbly Effect Logic
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <div 
      className="form-wrapper" 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* THE ASTRONAUT IMAGE (Peeking from Left, Behind the Bar) */}
      <img 
        src="https://z-cdn-media.chatglm.cn/files/20a21537-1213-4724-8126-11226f4abfcd.png?auth_key=1874022205-ba0b69a2ffe943e5ab28ace13eef150e-0-b2d2237085b2c821a68a9e219fd9da9d" 
        alt="Astronaut" 
        className="peeking-image" 
      />

      <div className="hero-img">
        <svg width="50" height="50" viewBox="0 0 24 24" fill="#00f3ff">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      </div>
      <h2>Login</h2>
      {error && <p className="error-msg">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email ID</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your email" 
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter your password" 
          />
        </div>

        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      
      <p className="link-style">
        New user? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;