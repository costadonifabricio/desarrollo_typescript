import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Nav from "./nav";
import "../../public/equipos.css";

function TechnicianEquipmentManagement() {
  const [equipos, setEquipos] = useState([]);
  const [selectedState, setSelectedState] = useState({}); 

  useEffect(() => {

    axios
      .get("http://localhost:4000/api/equipment", 
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      )
      .then((response) => {
        setEquipos(response.data);

        const initialState = {};
        response.data.forEach((equipo) => {
          initialState[equipo.id] = equipo.state;
        });
        setSelectedState(initialState);
      })
      .catch((error) => {
        console.error("Error al obtener equipos:", error);
      });
  }, []);

  const handleSelectChange = (id, newState) => {
    setSelectedState((prevState) => ({
      ...prevState,
      [id]: newState,
    }));
  };

  const handleUpdateState = (id) => {
    const updatedEquipment = {
      state: selectedState[id],
    };

    axios
      .put(`http://localhost:4000/api/equipment/${id}`, updatedEquipment, 
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      )
      .then(() => {
        setEquipos(
          equipos.map((equipo) =>
            equipo.id === id ? { ...equipo, state: selectedState[id] } : equipo
          )
        );
        Swal.fire({
          icon: "success",
          title: "Estado actualizado",
          text: "El estado del equipo se ha actualizado correctamente.",
        });
      })
      .catch((error) => {
        console.error("Error al actualizar el estado del equipo:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al actualizar el estado del equipo.",
        });
      });
  };

  return (
    <>
      <Nav />
      <div className="equipo-container">
        <h2>Gestión de Equipos - Técnico</h2>

        <div className="equipo-lista">
          <h3>Lista de Equipos</h3>
          {equipos.length === 0 ? (
            <p>No hay equipos disponibles</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {equipos.map((equipo) => (
                  <tr key={equipo.id}>
                    <td>{equipo.brand}</td>
                    <td>{equipo.model}</td>
                    <td>
                      <select
                        value={selectedState[equipo.id] ? "true" : "false"}
                        onChange={(e) =>
                          handleSelectChange(equipo.id, e.target.value === "true")
                        }
                      >
                        <option value="true">En Reparación</option>
                        <option value="false">Fuera de Servicio</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className="update-btn"
                        onClick={() => handleUpdateState(equipo.id)}
                      >
                        Actualizar Estado
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default TechnicianEquipmentManagement;
