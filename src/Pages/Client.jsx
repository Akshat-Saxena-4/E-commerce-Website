import { useState } from "react";
import Navbar from "../components/Navbar";
import { initialProducts } from "../data/products";

function Client() {
  const [cart, setCart] = useState([]);
  const products = initialProducts;

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h3>Products</h3>

        {products.map((p) => (
          <div key={p.id} className="card p-3 my-2">
            <h5>{p.name}</h5>
            <p>₹{p.price}</p>
            <button
              className="btn btn-success"
              onClick={() => addToCart(p)}
            >
              Add to Cart
            </button>
          </div>
        ))}

        <h3 className="mt-4">Cart</h3>

        {cart.map((item, index) => (
          <div key={index} className="d-flex justify-content-between my-2">
            <span>{item.name}</span>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => removeFromCart(index)}
            >
              Remove
            </button>
          </div>
        ))}

        <h4>Total: ₹{total}</h4>
      </div>
    </>
  );
}

export default Client;