import { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./nav";
import "../../public/equipos.css";

function EquipoManagement() {
  const [equipos, setEquipos] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [state, setState] = useState(true);
  const [editMode, setEditMode] = useState(false); // Nuevo estado para el modo edición
  const [editId, setEditId] = useState(null); // Nuevo estado para el ID del equipo en edición

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
    const equipo = { name, description, price, stock, category, state };

    if (editMode) {
      // Actualizar equipo
      axios
        .put(`http://localhost:4000/api/equipment/${editId}`, equipo)
        .then(() => {
          setEquipos(
            equipos.map((e) => (e.id === editId ? { ...e, ...equipo } : e))
          );
          resetForm();
        })
        .catch((error) => {
          console.error("Error al editar equipo:", error);
        });
    } else {
      // Agregar nuevo equipo
      axios
        .post("http://localhost:4000/api/equipment", equipo)
        .then((response) => {
          const equipoCreado = response.data.equipment;
          if (equipoCreado && equipoCreado.id) {
            setEquipos([...equipos, equipoCreado]);
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
        });
    }
  };

  const handleDeleteEquipo = (id) => {
    axios
      .delete(`http://localhost:4000/api/equipment/${id}`)
      .then(() => {
        setEquipos(equipos.filter((equipo) => equipo.id !== id));
      })
      .catch((error) => {
        console.error("Error al eliminar equipo:", error);
      });
  };

  const handleEditEquipo = (equipo) => {
    setName(equipo.name);
    setDescription(equipo.description);
    setPrice(equipo.price);
    setStock(equipo.stock);
    setCategory(equipo.category);
    setState(equipo.state);
    setEditId(equipo.id); // Establecer ID del equipo en edición
    setEditMode(true); // Habilitar modo edición
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice(0);
    setStock(0);
    setCategory("");
    setState(true);
    setEditMode(false); // Deshabilitar modo edición
    setEditId(null); // Limpiar ID del equipo en edición
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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Descripción del equipo"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Precio"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(parseInt(e.target.value, 10))}
          />
          <input
            type="text"
            placeholder="Categoría"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <select
            value={state}
            onChange={(e) => setState(e.target.value === "true")}
          >
            <option value={true}>Disponible</option>
            <option value={false}>No Disponible</option>
          </select>
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
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Categoría</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {equipos.map((equipo) => {
                  return (
                    <tr key={equipo.id}>
                      <td>{equipo.name}</td>
                      <td>{equipo.description}</td>
                      <td>{equipo.price}</td>
                      <td>{equipo.stock}</td>
                      <td>{equipo.category}</td>
                      <td>{equipo.state ? "Disponible" : "No Disponible"}</td>
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
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default EquipoManagement;
