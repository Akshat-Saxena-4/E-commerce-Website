import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const ShopkeeperDashboard = () => {
  const { currentUser, logout, products, addProduct } = useAuth();
  const [prodName, setProdName] = useState('');
  const [prodPrice, setProdPrice] = useState('');

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!prodName || !prodPrice) return alert("Fill all fields");
    addProduct(prodName, prodPrice);
    setProdName('');
    setProdPrice('');
    alert("Product Added to Store!");
  };

  return (
    <div>
      <div className="dashboard-card">
        <h2 className="welcome-text">Shopkeeper Hub</h2>
        <p>Welcome, <b>{currentUser?.name}</b></p>
        <span className="role-badge badge-shopkeeper">{currentUser?.designation}</span>
      </div>

      {/* Add Product Section */}
      <div className="dashboard-card">
        <h3>Stock Your Shop</h3>
        <form onSubmit={handleAddProduct} className="inline-form">
          <input 
            type="text" 
            placeholder="Item Name" 
            value={prodName} 
            onChange={(e) => setProdName(e.target.value)} 
          />
          <input 
            type="number" 
            placeholder="Price (₹)" 
            value={prodPrice} 
            onChange={(e) => setProdPrice(e.target.value)} 
          />
          <button type="submit" className="btn btn-success">Add Item</button>
        </form>
      </div>

      {/* Inventory View */}
      <div className="dashboard-card">
        <h3>Current Inventory</h3>
        {products.length === 0 ? <p>No items in store.</p> : (
          products.map(item => (
            <div key={item.id} className="product-item">
              <div>
                <b>{item.name}</b> <br/>
                <small>₹{item.price}</small>
              </div>
              <span className="stock-label">In Stock</span>
            </div>
          ))
        )}
      </div>

      <button onClick={logout} className="btn" style={{backgroundColor: '#95a5a6'}}>Logout</button>
    </div>
  );
};

export default ShopkeeperDashboard;