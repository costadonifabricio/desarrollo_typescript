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
        { name, email, password, role }
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
    <div className="register-page">
      <div className="register-image"></div>
      <div className="register-form-container">
        <div className="form-wrapper">
          <h2>Crea tu Cuenta</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                placeholder="Ingresa tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Ingresa tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="role">Elige tu Rol:</label>
              <select id="role" value={role} onChange={handleRoleChange}>
                <option value="admin">Admin</option>
                <option value="user">Usuario</option>
              </select>
            </div>
            <button type="submit">Registrar</button>
            <p>
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="login-link">
                Inicia sesión aquí
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
