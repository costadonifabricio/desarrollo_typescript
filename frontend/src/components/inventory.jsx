import { useState } from "react";
import Nav from "./nav";
import "../../public/equipos.css";

function EquipoManagement() {
  const [equipos, setEquipos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [modelo, setModelo] = useState("");
  const [estado, setEstado] = useState("Disponible");

  const handleAddEquipo = () => {
    if (nombre && modelo) {
      const nuevoEquipo = { nombre, modelo, estado };
      setEquipos([...equipos, nuevoEquipo]);
      setNombre("");
      setModelo("");
      setEstado("Disponible");
    }
  };

  const handleDeleteEquipo = (index) => {
    const nuevosEquipos = equipos.filter((_, i) => i !== index);
    setEquipos(nuevosEquipos);
  };

  return (
    <>
    <Nav />
      <div className="equipo-container">
        <h2>Gestión de Equipos Informáticos</h2>
        <div className="equipo-form">
          <input
            type="text"
            placeholder="Nombre del equipo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type="text"
            placeholder="Modelo del equipo"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
          />
          <select value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option value="Disponible">Disponible</option>
            <option value="En uso">En uso</option>
            <option value="En reparación">En reparación</option>
          </select>
          <button onClick={handleAddEquipo}>Agregar Equipo</button>
        </div>

        <div className="equipo-lista">
          <h3>Lista de Equipos</h3>
          {equipos.length === 0 ? (
            <p>No hay equipos agregados</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Modelo</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {equipos.map((equipo, index) => (
                  <tr key={index}>
                    <td>{equipo.nombre}</td>
                    <td>{equipo.modelo}</td>
                    <td>{equipo.estado}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteEquipo(index)}
                      >
                        Eliminar
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

export default EquipoManagement;
