import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../../public/register.css";

function Register({ onLoginClick }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/api/users", {
        name,
        email,
        password,
        role,
      });

      if (response.status === 201) {
        Swal.fire({
          title: "Registration Successful",
          text: "You have registered successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Registration Failed",
        text: "There was an error with your registration.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Crea tu Cuenta</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
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
          <div className="role-selection">
            <label htmlFor="role">Elige tu Rol:</label>
            <select id="role" value={role} onChange={handleRoleChange}>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <button type="submit">Register</button>
          <p>
            ¿Ya tienes una cuenta?{" "}
            <span className="login-link" onClick={onLoginClick}>
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
