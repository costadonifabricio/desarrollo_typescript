import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from "../components/register";
import Login from "../components/login";
import EquipoManagement from "../components/inventory";
import PrivateRoute from "../components/privateRoute";
import { AuthProvider } from "../context/AuthContext";
import UserManagement from "../components/userPanel";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="user-panel" element={<UserManagement />} />
          <Route
            path="/equipos"
            element={
              <PrivateRoute>
                <EquipoManagement />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
