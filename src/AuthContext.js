import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [products, setProducts] = useState([]);

  // Initialize user and products from storage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('bmobile_user'));
    if (user) setCurrentUser(user);

    const storedProducts = JSON.parse(localStorage.getItem('bmobile_products')) || [];
    setProducts(storedProducts);
  }, []);

  // --- AUTH FUNCTIONS ---
  const register = (name, designation, email, password) => {
    const existingUsers = JSON.parse(localStorage.getItem('bmobile_users')) || [];
    if (existingUsers.find(u => u.email === email)) {
      throw new Error("Email already exists");
    }
    const newUser = { name, designation, email, password };
    existingUsers.push(newUser);
    localStorage.setItem('bmobile_users', JSON.stringify(existingUsers));
    return true;
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('bmobile_users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('bmobile_user', JSON.stringify(user));
      return user;
    } else {
      throw new Error("Invalid email or password");
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('bmobile_user');
  };

  // --- PRODUCT FUNCTIONS ---
  const addProduct = (name, price) => {
    const newProduct = {
      id: Date.now(),
      name,
      price,
      addedBy: currentUser?.name || 'Unknown'
    };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('bmobile_products', JSON.stringify(updatedProducts));
  };

  const deleteProduct = (id) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('bmobile_products', JSON.stringify(updatedProducts));
  };

  const getAllUsers = () => {
    return JSON.parse(localStorage.getItem('bmobile_users')) || [];
  };

  const value = {
    currentUser,
    register,
    login,
    logout,
    products,
    addProduct,
    deleteProduct,
    getAllUsers
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};