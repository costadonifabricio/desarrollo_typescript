import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Nav from "../components/nav";
import "../../public/welcome.css";

function Welcome() {
  const { userRole } = useContext(AuthContext);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = parseJwt(token);
      if (decodedToken && decodedToken.email) {
        setUserEmail(decodedToken.email);
      }
    }
  }, []);

  const parseJwt = (token) => {
    try {
      const payload = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload;
    } catch (error) {
      console.error("Error decoding JWT", error);
      return null;
    }
  };

  return (
    <>
      <Nav />
      <div className="welcome-page">
        <div className="welcome-content">
          <h1>¡Bienvenido, {userEmail}!</h1>
          <p>
            Tu rol actual es: <strong>{userRole}</strong>
          </p>
        </div>
      </div>
    </>
  );
}

export default Welcome;
