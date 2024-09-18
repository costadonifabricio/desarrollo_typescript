import { useContext, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Nav from "./nav";
import "../../public/company.css";

function Company() {
  const { userRole } = useContext(AuthContext);
  const navigate = useNavigate();

  const [newOrgName, setNewOrgName] = useState("");
  const [newOrgWebsite, setNewOrgWebsite] = useState("");
  const [newOrgUbicacion, setNewOrgUbicacion] = useState("");

  const [newProvName, setNewProvName] = useState("");
  const [newProvWebsite, setNewProvWebsite] = useState("");
  const [newProvUbicacion, setNewProvUbicacion] = useState("");
  const [newProvType, setNewProvType] = useState("");
  const [newProvDate, setNewProvDate] = useState("");

  const handleAddOrganization = () => {
    if (!newOrgName || !newOrgWebsite || !newOrgUbicacion) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos obligatorios para la organización.",
      });
      return;
    }

    axios
      .post("http://localhost:4000/api/organizations", {
        name: newOrgName,
        website: newOrgWebsite,
        ubicacion: newOrgUbicacion,
      })
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Organización creada",
          text: "La organización se ha creado correctamente.",
        });
        setNewOrgName("");
        setNewOrgWebsite("");
        setNewOrgUbicacion("");
        navigate("/welcome");
      })
      .catch((error) => {
        console.error("Error al crear organización:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al crear la organización. Inténtalo nuevamente.",
        });
      });
  };

  const handleAddProvider = () => {
    if (
      !newProvName ||
      !newProvWebsite ||
      !newProvUbicacion ||
      !newProvType ||
      !newProvDate
    ) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos obligatorios para el proveedor.",
      });
      return;
    }

    axios
      .post("http://localhost:4000/api/provider", {
        name: newProvName,
        website: newProvWebsite,
        ubicacion: newProvUbicacion,
        type_provider: newProvType,
        date_contract: newProvDate,
      })
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Proveedor creado",
          text: "El proveedor se ha creado correctamente.",
        });
        setNewProvName("");
        setNewProvWebsite("");
        setNewProvUbicacion("");
        setNewProvType("");
        setNewProvDate("");
        navigate("/welcome");
      })
      .catch((error) => {
        console.error("Error al crear proveedor:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al crear el proveedor. Inténtalo nuevamente.",
        });
      });
  };

  const isAuthorized =
    userRole === "administrador" || userRole === "gestor de inventario";

  return (
    <>
      <Nav />

      <div className="admin-dashboard">
        {isAuthorized ? (
          <div className="dashboard-container">
            <div className="form-section">
              <h2 className="section-title">Crear Organización</h2>
              <div className="form-group">
                <label htmlFor="orgName">Nombre de la Organización</label>
                <input
                  id="orgName"
                  type="text"
                  placeholder="Nombre de la organización"
                  value={newOrgName}
                  onChange={(e) => setNewOrgName(e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="orgWebsite">Sitio Web</label>
                <input
                  id="orgWebsite"
                  type="text"
                  placeholder="Sitio web"
                  value={newOrgWebsite}
                  onChange={(e) => setNewOrgWebsite(e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="orgUbicacion">Ubicación</label>
                <input
                  id="orgUbicacion"
                  type="text"
                  placeholder="Ubicación"
                  value={newOrgUbicacion}
                  onChange={(e) => setNewOrgUbicacion(e.target.value)}
                  className="form-input"
                />
              </div>
              <button onClick={handleAddOrganization} className="submit-button">
                Crear Organización
              </button>
            </div>

            <div className="form-section">
              <h2 className="section-title">Crear Proveedor</h2>
              <div className="form-group">
                <label htmlFor="provName">Nombre del Proveedor</label>
                <input
                  id="provName"
                  type="text"
                  placeholder="Nombre del proveedor"
                  value={newProvName}
                  onChange={(e) => setNewProvName(e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="provWebsite">Sitio Web</label>
                <input
                  id="provWebsite"
                  type="text"
                  placeholder="Sitio web"
                  value={newProvWebsite}
                  onChange={(e) => setNewProvWebsite(e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="provUbicacion">Ubicación</label>
                <input
                  id="provUbicacion"
                  type="text"
                  placeholder="Ubicación"
                  value={newProvUbicacion}
                  onChange={(e) => setNewProvUbicacion(e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="provType">Tipo de Proveedor</label>
                <input
                  id="provType"
                  type="text"
                  placeholder="Tipo de proveedor"
                  value={newProvType}
                  onChange={(e) => setNewProvType(e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="provDate">Fecha de Contrato</label>
                <input
                  id="provDate"
                  type="date"
                  value={newProvDate}
                  onChange={(e) => setNewProvDate(e.target.value)}
                  className="form-input"
                />
              </div>
              <button onClick={handleAddProvider} className="submit-button">
                Crear Proveedor
              </button>
            </div>
          </div>
        ) : (
          <p className="error-message">
            No tienes permiso para acceder a esta sección.
          </p>
        )}
      </div>
    </>
  );
}

export default Company;
