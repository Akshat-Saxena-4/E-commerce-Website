import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const ClientDashboard = () => {
  const { currentUser, logout, products } = useAuth();
  const [cart, setCart] = useState([]);

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

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="dashboard-card" style={{backgroundColor: '#e8f8f5', border: '1px solid #2ecc71'}}>
          <h3>My Cart ({cart.length} items)</h3>
          <p>Total: <b>₹{total}</b></p>
          <button className="btn btn-success" onClick={() => alert('Purchase Successful! Thank you.')}>
            Checkout
          </button>
        </div>
      )}

      {/* Product Listing */}
      <div className="dashboard-card">
        <h3>Available Products</h3>
        {products.length === 0 ? <p>No products available right now.</p> : (
          <div className="product-grid">
            {products.map(item => (
              <div key={item.id} className="product-card">
                <div className="product-icon">📱</div>
                <h4>{item.name}</h4>
                <p className="price">₹{item.price}</p>
                <button onClick={() => addToCart(item)} className="btn btn-success btn-sm">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button onClick={logout} className="btn" style={{backgroundColor: '#95a5a6'}}>Logout</button>
    </div>
  );
};

export default ClientDashboard;