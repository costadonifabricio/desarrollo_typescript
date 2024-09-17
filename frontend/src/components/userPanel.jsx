import { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./nav";
import "../../public/userPanel.css";
import Swal from "sweetalert2";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/users")
      .then((response) => {
        const filteredUsers = response.data.filter(user => user.role !== 'administrador');
        setUsers(filteredUsers);
      })
      .catch((error) => {
        console.error("Error al obtener usuarios:", error);
      });
  }, []);

  const handleAddOrUpdateUser = () => {
    if (!name || !email || !role) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos obligatorios.",
      });
      return;
    }

    const user = { name, email, role };

    if (editMode) {
      axios
        .put(`http://localhost:4000/api/users/${editId}`, user)
        .then(() => {
          setUsers(users.map((u) => (u.id === editId ? { ...u, ...user } : u)));
          Swal.fire({
            icon: "success",
            title: "Usuario actualizado",
            text: "El usuario se ha actualizado correctamente.",
          });
          resetForm();
        })
        .catch((error) => {
          console.error("Error al editar usuario:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un problema al actualizar el usuario. Inténtalo nuevamente.",
          });
        });
    } else {
      Swal.fire({
        icon: "info",
        title: "Agregar Usuario",
        text: "La funcionalidad de agregar usuario no está disponible.",
      });
    }
  };

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, no podrás recuperar este usuario.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:4000/api/users/${id}`)
          .then(() => {
            setUsers(users.filter((user) => user.id !== id));
            Swal.fire("Eliminado", "El usuario ha sido eliminado.", "success");
          })
          .catch((error) => {
            console.error("Error al eliminar usuario:", error);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Hubo un problema al eliminar el usuario. Inténtalo nuevamente.",
            });
          });
      }
    });
  };

  const handleEditUser = (user) => {
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setEditId(user.id);
    setEditMode(true);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setRole("");
    setEditMode(false);
    setEditId(null);
  };

  return (
    <>
      <Nav />
      <div className="user-panel">
        <h1>Panel de Usuarios de la App</h1>

        <div className="user-list">
          {users.length === 0 ? (
            <p>No hay usuarios registrados</p>
          ) : (
            <table className="user-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo Electrónico</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => handleEditUser(user)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteUser(user.id)}
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

export default UserManagement;
