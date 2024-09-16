import { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./nav";
import "../../public/equipos.css";
import Swal from "sweetalert2";

function EquipoManagement() {
  const [equipos, setEquipos] = useState([]);
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [model, setModel] = useState("");
  const [state, setState] = useState(true);
  const [ubication, setUbication] = useState("");
  const [date_adquisition, setDateAdquisition] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/equipment")
      .then((response) => {
        setEquipos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener equipos:", error);
      });
  }, []);

  const handleAddOrUpdateEquipo = () => {
    if (!brand || !description || !model || !ubication || !date_adquisition) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos obligatorios.",
      });
      return;
    }

    const equipo = {
      brand,
      description,
      model,
      state,
      ubication,
      date_adquisition,
    };

    if (editMode) {
      axios
        .put(`http://localhost:4000/api/equipment/${editId}`, equipo)
        .then(() => {
          setEquipos(
            equipos.map((e) => (e.id === editId ? { ...e, ...equipo } : e))
          );
          Swal.fire({
            icon: "success",
            title: "Equipo actualizado",
            text: "El equipo se ha actualizado correctamente.",
          });
          resetForm();
        })
        .catch((error) => {
          console.error("Error al editar equipo:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un problema al actualizar el equipo. Inténtalo nuevamente.",
          });
        });
    } else {
      axios
        .post("http://localhost:4000/api/equipment", equipo)
        .then((response) => {
          console.log("Respuesta de la API:", response.data);
          const equipoCreado = response.data.equipment;
          if (equipoCreado && equipoCreado.id) {
            setEquipos([...equipos, equipoCreado]);
            Swal.fire({
              icon: "success",
              title: "Equipo creado",
              text: "El equipo se ha creado correctamente.",
            });
            resetForm();
          } else {
            console.error(
              "La respuesta de la API no contiene un equipo válido:",
              response.data
            );
          }
        })
        .catch((error) => {
          console.error("Error al agregar equipo:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un problema al agregar el equipo. Inténtalo nuevamente.",
          });
        });
    }
  };

  const handleDeleteEquipo = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Una vez eliminado, no podrás recuperar este equipo.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:4000/api/equipment/${id}`)
          .then(() => {
            setEquipos(equipos.filter((equipo) => equipo.id !== id));
            Swal.fire(
              'Eliminado',
              'El equipo ha sido eliminado.',
              'success'
            );
          })
          .catch((error) => {
            console.error("Error al eliminar equipo:", error);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Hubo un problema al eliminar el equipo. Inténtalo nuevamente.",
            });
          });
      }
    });
  };

  const handleEditEquipo = (equipo) => {
    setBrand(equipo.brand);
    setDescription(equipo.description);
    setModel(equipo.model);
    setState(equipo.state);
    setDateAdquisition(equipo.date_adquisition);
    setUbication(equipo.ubication);
    setEditId(equipo.id);
    setEditMode(true);
  };

  const resetForm = () => {
    setBrand("");
    setDescription("");
    setModel("");
    setState(true);
    setDateAdquisition("");
    setUbication("");
    setEditMode(false);
    setEditId(null);
  };

  return (
    <>
      <Nav />
      <div className="equipo-container">
        <h2>Gestión de Equipos Informáticos</h2>
        <div className="equipo-form">
          <div className="form-group">
            <label htmlFor="brand">Marca del Equipo</label>
            <input
              id="brand"
              type="text"
              placeholder="Marca del equipo"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción del equipo</label>
            <input
              id="description"
              type="text"
              placeholder="Descripción del equipo"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="model">Modelo</label>
            <input
              id="model"
              type="text"
              placeholder="Modelo"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">Estado</label>
            <select
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value === "true")}
            >
              <option value={true}>En Reparación</option>
              <option value={false}>Fuera de Servicio</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="ubication">Ubicación</label>
            <input
              id="ubication"
              type="text"
              placeholder="Ubicación"
              value={ubication}
              onChange={(e) => setUbication(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date_adquisition">Fecha de adquisición</label>
            <input
              id="date_adquisition"
              type="datetime-local"
              placeholder="Fecha de adquisicion"
              value={date_adquisition}
              onChange={(e) => setDateAdquisition(e.target.value)}
            />
          </div>
          <button onClick={handleAddOrUpdateEquipo}>
            {editMode ? "Actualizar Equipo" : "Agregar Equipo"}
          </button>
          {editMode && (
            <button onClick={resetForm} className="cancel-btn">
              Cancelar
            </button>
          )}
        </div>

        <div className="equipo-lista">
          <h3>Lista de Equipos</h3>
          {equipos.length === 0 ? (
            <p>No hay equipos agregados</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Marca</th>
                  <th>Descripción</th>
                  <th>Modelo</th>
                  <th>Estado</th>
                  <th>Ubicación</th>
                  <th>Fecha de adquisición</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {equipos.map((equipo) => (
                  <tr key={equipo.id}>
                    <td>{equipo.brand}</td>
                    <td>{equipo.description}</td>
                    <td>{equipo.model}</td>
                    <td>{equipo.state ? "En Reparación" : "Fuera de Servicio"}</td>
                    <td>{equipo.ubication}</td>
                    <td>{equipo.date_adquisition}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteEquipo(equipo.id)}
                      >
                        Eliminar
                      </button>
                      <button
                        className="edit-btn"
                        onClick={() => handleEditEquipo(equipo)}
                      >
                        Editar
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
