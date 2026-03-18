import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const AdminDashboard = () => {
  const { currentUser, logout, products, addProduct, deleteProduct, getAllUsers } = useAuth();
  const [prodName, setProdName] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [showUsers, setShowUsers] = useState(false);
  const users = getAllUsers();

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!prodName || !prodPrice) return alert("Fill all fields");
    addProduct(prodName, prodPrice);
    setProdName('');
    setProdPrice('');
    alert("Product Added!");
  };

  return (
    <div>
      <div className="dashboard-card">
        <h2 className="welcome-text">Admin Panel</h2>
        <p>Welcome, <b>{currentUser?.name}</b></p>
        <span className="role-badge badge-admin">{currentUser?.designation}</span>
      </div>

      {/* Add Product Section */}
      <div className="dashboard-card">
        <h3>Add New Product</h3>
        <form onSubmit={handleAddProduct} className="inline-form">
          <input 
            type="text" 
            placeholder="Product Name" 
            value={prodName} 
            onChange={(e) => setProdName(e.target.value)} 
          />
          <input 
            type="number" 
            placeholder="Price" 
            value={prodPrice} 
            onChange={(e) => setProdPrice(e.target.value)} 
          />
          <button type="submit" className="btn btn-success">Add</button>
        </form>
      </div>

      {/* View Users Section (Admin Only) */}
      <div className="dashboard-card">
        <button onClick={() => setShowUsers(!showUsers)} className="btn btn-secondary">
          {showUsers ? "Hide Users" : "View All Users"}
        </button>
        {showUsers && (
          <ul className="user-list">
            {users.map((u, i) => (
              <li key={i}>{u.name} ({u.designation}) - {u.email}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Product List */}
      <div className="dashboard-card">
        <h3>Inventory Control</h3>
        {products.length === 0 ? <p>No products yet.</p> : (
          products.map(item => (
            <div key={item.id} className="product-item">
              <div>
                <b>{item.name}</b> <br/>
                <small>₹{item.price} (Added by: {item.addedBy})</small>
              </div>
              <button onClick={() => deleteProduct(item.id)} className="btn btn-danger">Delete</button>
            </div>
          ))
        )}
      </div>

      <button onClick={logout} className="btn" style={{backgroundColor: '#95a5a6'}}>Logout</button>
    </div>
  );
};

export default AdminDashboard;