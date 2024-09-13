import React from "react";
import { useNavigate } from "react-router-dom";
import "../../public/nav.css"; 

function Nav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login"); 
  };

  return (
    <nav className="nav-bar">
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </nav>
  );
}

export default Nav;
