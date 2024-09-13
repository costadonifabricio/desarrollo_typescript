import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../../public/login.css";

function Login({ onRegisterClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/api/users/login", {
        email,
        password,
      });

      if (response.status === 200) {
        Swal.fire({
          title: "Inicio Exitoso",
          text: "Pudiste iniciar sin problemas.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.href = "/";
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Inicio Fallido",
        text: "Email o Contraseña incorrecta.",
        icon: "error",
        confirmButtonText: "Volver a intentar",
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>
          No tienes una cuenta?{" "}
          <span className="register-link" onClick={onRegisterClick}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
