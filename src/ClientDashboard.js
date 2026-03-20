import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const ClientDashboard = () => {
  const { currentUser, logout, products } = useAuth();
  const [cart, setCart] = useState([]);

  // Function to get random emoji for product
  const getProductIcon = (id) => {
    const icons = ['📱', '💻', '🎧', '⌚', '📷', '🕹️', '💾', '🔋'];
    // Use ID to pick a consistent icon for the same product
    return icons[id % icons.length]; 
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);

  return (
    <div>
      <div className="dashboard-card">
        <h2 className="welcome-text">Welcome, Shopper!</h2>
        <p>Hi, <b>{currentUser?.name}</b></p>
        <span className="role-badge badge-client">{currentUser?.designation}</span>
      </div>

      {cart.length > 0 && (
        <div className="dashboard-card" style={{background: 'rgba(0, 255, 128, 0.15)', border: '1px solid #38ef7d'}}>
          <h3>🛒 My Cart ({cart.length} items)</h3>
          <p>Total: <b>₹{total}</b></p>
          <button className="btn btn-success" onClick={() => { setCart([]); alert('Purchase Successful!'); }}>
            Checkout
          </button>
        </div>
      )}

      <div className="dashboard-card">
        <h3 style={{marginBottom: '15px'}}>Latest Products</h3>
        {products.length === 0 ? (
          <p style={{opacity: 0.7}}>No products available yet.</p>
        ) : (
          <div className="product-grid">
            {products.map(item => (
              <div key={item.id} className="product-card">
                <span className="product-icon">{getProductIcon(item.id)}</span>
                <div className="product-item-name">{item.name}</div>
                <div className="price">₹{item.price}</div>
                <button onClick={() => addToCart(item)} className="btn btn-primary btn-sm">
                  Add +
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button onClick={logout} className="btn btn-secondary">Logout</button>
    </div>
  );
};

export default ClientDashboard;