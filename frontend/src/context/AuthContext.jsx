import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userRole, setUserRole] = useState(Cookies.get('userRole') || null);

  useEffect(() => {
    if (token) {
      const decodedToken = parseJwt(token);
      if (decodedToken) {
        Cookies.set('userRole', decodedToken.role || null);
        setUserRole(decodedToken.role || null);
      }
    }
  }, [token]);

  const parseJwt = (token) => {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload;
    } catch (error) {
      console.error("Error decoding JWT", error);
      return null;
    }
  };

  const login = async (credentials) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        credentials
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      setToken(token);
      setIsAuthenticated(true);

      const decodedToken = parseJwt(token);
      if (decodedToken) {
        Cookies.set('userRole', decodedToken.role || null);
        setUserRole(decodedToken.role || null);
      }
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al iniciar sesión"
      );
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
    Cookies.remove('userRole');
    setUserRole(null);
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        userData
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      setToken(token);
      setIsAuthenticated(true);

      const decodedToken = parseJwt(token);
      if (decodedToken) {
        Cookies.set('userRole', decodedToken.role || null);
        setUserRole(decodedToken.role || null);
      }
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al registrar usuario"
      );
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, register, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};
