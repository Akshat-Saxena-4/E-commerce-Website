import Navbar from "../components/Navbar";
import { initialProducts } from "../data/products";

function Admin() {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h3>Admin Dashboard</h3>
        <p>Total Products: {initialProducts.length}</p>
        <p>Total Users: 3</p>
      </div>
    </>
  );
}

export default Admin;