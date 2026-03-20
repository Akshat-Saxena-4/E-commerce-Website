import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Login from './Login';
import Register from './Register';
import AdminDashboard from './AdminDashboard';
import ShopkeeperDashboard from './ShopkeeperDashboard';
import ClientDashboard from './ClientDashboard';
import './App.css';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" />;
  if (allowedRole && currentUser.designation !== allowedRole) {
    if(currentUser.designation === 'Admin') return <Navigate to="/admin" />;
    if(currentUser.designation === 'Shopkeeper') return <Navigate to="/shopkeeper" />;
    return <Navigate to="/client" />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="mobile-container">
          {/* Animated Background Shapes */}
          <div className="bg-shape shape-1"></div>
          <div className="bg-shape shape-2"></div>
          
          <h1 className="app-title">B Mobile</h1>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/admin" element={
              <ProtectedRoute allowedRole="Admin"><AdminDashboard /></ProtectedRoute>
            } />
            <Route path="/shopkeeper" element={
              <ProtectedRoute allowedRole="Shopkeeper"><ShopkeeperDashboard /></ProtectedRoute>
            } />
            <Route path="/client" element={
              <ProtectedRoute allowedRole="Client"><ClientDashboard /></ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;