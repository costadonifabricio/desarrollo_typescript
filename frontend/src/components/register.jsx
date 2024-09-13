import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import "../../public/register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/register",
        {
          name,
          email,
          password,
          role,
        }
      );

      if (response.status === 201) {
        const token = response.data.token;
        localStorage.setItem("token", token);

        Swal.fire({
          title: "Registro Exitoso",
          text: "Te has registrado correctamente.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/login");
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Registro Fallido",
        text: "Hubo un error al registrar tu cuenta.",
        icon: "error",
        confirmButtonText: "Volver a intentar",
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
            placeholder="Nombre"
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
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="role-selection">
            <label htmlFor="role">Elige tu Rol:</label>
            <select id="role" value={role} onChange={handleRoleChange}>
              <option value="admin">Admin</option>
              <option value="user">Usuario</option>
            </select>
          </div>
          <button type="submit">Register</button>
        </form>
        <p>
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="login-link">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
