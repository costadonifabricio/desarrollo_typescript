import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import "../../public/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/login",
        { email, password }
      );

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);

        Swal.fire({
          title: "Inicio Exitoso",
          text: "Pudiste iniciar sin problemas.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/equipos");
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
    <div className="login-page">
      <div className="login-image"></div>
      <div className="login-form-container">
        <div className="form-wrapper">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Ingrese su email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
            <p>
              ¿No tienes una cuenta?{" "}
              <Link to="/register" className="register-link">
                Regístrate aquí
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
