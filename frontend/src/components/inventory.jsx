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
  const [category, setCategory] = useState("");
  const [date_adquisition, setDateAdquisition] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [providerId, setProviderId] = useState("");
  const [organizations, setOrganizations] = useState([]);
  const [providers, setProviders] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchEquipos();
    fetchOrganizations();
    fetchProviders();
  }, []);

  const fetchEquipos = () => {
    axios
      .get("http://localhost:4000/api/equipment", 
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      )
      .then((response) => {
        console.log("Equipos:", response.data);
        setEquipos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener equipos:", error);
      });
  };

  const fetchOrganizations = () => {
    axios
      .get("http://localhost:4000/api/organizations")
      .then((response) => {
        console.log("Organizaciones:", response.data);
        setOrganizations(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener organizaciones:", error);
      });
  };

  const fetchProviders = () => {
    axios
      .get("http://localhost:4000/api/provider")
      .then((response) => {
        console.log("Proveedores:", response.data);
        setProviders(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener proveedores:", error);
      });
  };

  const handleAddOrUpdateEquipo = () => {
    if (
      !brand ||
      !description ||
      !model ||
      !category ||
      !date_adquisition ||
      !organizationId ||
      !providerId
    ) {
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
      category,
      date_adquisition,
      organizationId,
      providerId,
    };

    if (editMode) {
      axios
        .put(`http://localhost:4000/api/equipment/${editId}`, equipo,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        )
        .then(() => {
          fetchEquipos(); 
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
        .post("http://localhost:4000/api/equipment", equipo, 
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        )
        .then((response) => {
          fetchEquipos();
          Swal.fire({
            icon: "success",
            title: "Equipo creado",
            text: "El equipo se ha creado correctamente.",
          });
          resetForm();
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

  const resetForm = () => {
    setBrand("");
    setDescription("");
    setModel("");
    setState(true);
    setDateAdquisition("");
    setCategory("");
    setOrganizationId("");
    setProviderId("");
    setEditMode(false);
    setEditId(null);
  };

  const getOrganizationName = (id) => {
    const org = organizations.find((org) => org.id === id);
    return org ? org.name : "Desconocido";
  };

  const getProviderName = (id) => {
    const prov = providers.find((prov) => prov.id === id);
    return prov ? prov.name : "Desconocido";
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
            <label htmlFor="ubication">Categoría</label>
            <input
              id="ubication"
              type="text"
              placeholder="Ubicación"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date_adquisition">Fecha de adquisición</label>
            <input
              id="date_adquisition"
              type="datetime-local"
              value={date_adquisition}
              onChange={(e) => setDateAdquisition(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="organization">Organización</label>
            <select
              id="organization"
              value={organizationId}
              onChange={(e) => setOrganizationId(e.target.value)}
            >
              <option value="">Selecciona una organización</option>
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="provider">Proveedor</label>
            <select
              id="provider"
              value={providerId}
              onChange={(e) => setProviderId(e.target.value)}
            >
              <option value="">Selecciona un proveedor</option>
              {providers.map((prov) => (
                <option key={prov.id} value={prov.id}>
                  {prov.name}
                </option>
              ))}
            </select>
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
                  <th>Categoría</th>
                  <th>Fecha de adquisición</th>
                  <th>Organización</th>
                  <th>Proveedor</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {equipos.map((equipo) => (
                  <tr key={equipo.id}>
                    <td>{equipo.brand}</td>
                    <td>{equipo.description}</td>
                    <td>{equipo.model}</td>
                    <td>
                      {equipo.state ? "En Reparación" : "Fuera de Servicio"}
                    </td>
                    <td>{equipo.category}</td>
                    <td>
                      {new Date(equipo.date_adquisition).toLocaleDateString()}
                    </td>
                    <td>{getOrganizationName(equipo.organizationId)}</td>
                    <td>{getProviderName(equipo.providerId)}</td>
                    <td>
                      <button
                        onClick={() => {
                          setEditMode(true);
                          setEditId(equipo.id);
                          setBrand(equipo.brand);
                          setDescription(equipo.description);
                          setModel(equipo.model);
                          setState(equipo.state);
                          setCategory(equipo.category);
                          setDateAdquisition(equipo.date_adquisition);
                          setOrganizationId(equipo.organizationId);
                          setProviderId(equipo.providerId);
                        }}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => {
                          Swal.fire({
                            title: "¿Estás seguro?",
                            text: "No podrás deshacer esta acción.",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Sí, borrar",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              axios
                                .delete(
                                  `http://localhost:4000/api/equipment/${equipo.id}`, 
                                  { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
                                )
                                .then(() => {
                                  fetchEquipos();
                                  Swal.fire(
                                    "Borrado!",
                                    "El equipo ha sido borrado.",
                                    "success"
                                  );
                                })
                                .catch((error) => {
                                  console.error(
                                    "Error al borrar equipo:",
                                    error
                                  );
                                  Swal.fire(
                                    "Error!",
                                    "Hubo un problema al borrar el equipo. Inténtalo nuevamente.",
                                    "error"
                                  );
                                });
                            }
                          });
                        }}
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
