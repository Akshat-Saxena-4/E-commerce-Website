import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Admin from "./pages/Admin";
import Shopkeeper from "./pages/Shopkeeper";
import Client from "./pages/Client";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="admin">
            <Admin />
          </ProtectedRoute>
        }
      />

      <Route
        path="/shopkeeper"
        element={
          <ProtectedRoute allowedRole="shopkeeper">
            <Shopkeeper />
          </ProtectedRoute>
        }
      />

      <Route
        path="/client"
        element={
          <ProtectedRoute allowedRole="client">
            <Client />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;