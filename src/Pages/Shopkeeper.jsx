import { useState } from "react";
import Navbar from "../components/Navbar";

function Shopkeeper() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const addProduct = () => {
    const newProduct = {
      id: Date.now(),
      name,
      price: Number(price),
    };
    setProducts([...products, newProduct]);
    setName("");
    setPrice("");
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h3>Add Product</h3>

        <input
          className="form-control my-2"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="form-control my-2"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button className="btn btn-primary" onClick={addProduct}>
          Add Product
        </button>

        <h3 className="mt-4">My Products</h3>

        {products.map((p) => (
          <div key={p.id} className="d-flex justify-content-between my-2">
            <span>
              {p.name} - ₹{p.price}
            </span>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteProduct(p.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Shopkeeper;