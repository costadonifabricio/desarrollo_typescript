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
import TechnicianEquipmentManagement from "../components/inventoryTech";
import PrivateRoute from "../components/privateRoute";
import { AuthProvider } from "../context/AuthContext";
import UserManagement from "../components/userPanel";
import Welcome from "../components/welcome";
import PageNotFound from "../components/pageNot";
import Company from "../components/formCompany";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/equipos"
            element={
              <PrivateRoute
                allowedRoles={["administrador", "gestor de inventario"]}
              >
                <EquipoManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/user-panel"
            element={
              <PrivateRoute allowedRoles={["administrador"]}>
                <UserManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/company"
            element={
              <PrivateRoute allowedRoles={["administrador"]}>
                <Company />
              </PrivateRoute>
            }
          />
          <Route
            path="/tecnico-panel"
            element={
              <PrivateRoute allowedRoles={["tecnico"]}>
                <TechnicianEquipmentManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/welcome"
            element={
              <PrivateRoute
                allowedRoles={[
                  "administrador",
                  "gestor de inventario",
                  "tecnico",
                ]}
              >
                <Welcome />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
