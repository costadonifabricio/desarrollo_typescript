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
        {
          email,
          password,
        }
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
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </form>
        <p>
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="register-link">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
