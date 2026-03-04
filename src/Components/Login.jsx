import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [error, setError] = useState("");

  const users = {
    admin: { email: "admin@gmail.com", password: "admin123" },
    shopkeeper: { email: "shop@gmail.com", password: "shop123" },
    client: { email: "client@gmail.com", password: "client123" },
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      email.trim() === users[role].email &&
      password.trim() === users[role].password
    ) {
      localStorage.setItem("role", role);
      navigate(`/${role}`);
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h3 className="text-center">Beam Mobile Login</h3>

        <form onSubmit={handleLogin}>
          <input
            className="form-control my-2"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="form-control my-2"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            className="form-select my-2"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="shopkeeper">Shopkeeper</option>
            <option value="client">Client</option>
          </select>

          <button className="btn btn-primary w-100 mt-2">
            Login
          </button>
        </form>

        <p className="text-danger mt-2">{error}</p>
      </div>
    </div>
  );
}

export default Login;