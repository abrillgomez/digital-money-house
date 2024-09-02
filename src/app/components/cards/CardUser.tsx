"use client";
import React, { useEffect, useState } from "react";
import UserAPI from "../../../services/users/users.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faSave } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

interface User {
  id?: number;
  dni: number;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  phone: string;
}

const CardUser: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = token.split(".")[1];
        const decodedPayload = JSON.parse(
          atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
        );
        const username = decodedPayload.username || decodedPayload.id;
        if (!username) {
          setError("Username no encontrado en el token");
          setLoading(false);
          return;
        }
        UserAPI.getUserData(token, username)
          .then((data) => {
            setUser(data);
            setEditedUser(data);
            setLoading(false);
          })
          .catch((err) => {
            setError("Error al obtener los datos del usuario");
            setLoading(false);
          });
      } catch (err) {
        setError("Error al decodificar el token");
        setLoading(false);
      }
    } else {
      setLoading(false);
      setError("Token no encontrado en el localStorage");
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editedUser || !user || !user.id) {
      Swal.fire(
        "Error",
        "No se puede guardar sin un ID de usuario válido",
        "error"
      );
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire("Error", "Token no encontrado", "error");
      return;
    }
    try {
      await UserAPI.updateUserData(token, user.id, editedUser);
      setUser(editedUser);
      setIsEditing(false);
      Swal.fire({
        title: "Actualizado",
        text: "Tus datos han sido actualizados",
        icon: "success",
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      Swal.fire("Error", "No se pudieron actualizar los datos", "error");
    }
  };

  if (loading) return <p className="text-custom-dark">Cargando...</p>;
  if (error) return <p className="text-custom-dark">Error: {error}</p>;

  return (
    <div className="mx-auto bg-white rounded-lg shadow-lg p-6 w-[1006px] rounded-[10px]">
      <h2 className="text-[20px] font-bold mb-4 text-black">Tus datos</h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <label className="text-custom-dark w-1/3">Email</label>
          {isEditing ? (
            <input
              type="text"
              className="text-black-opacity-50 flex-1 ml-1 border p-1 text-sm w-2/3"
              value={editedUser?.email}
              onChange={(e) =>
                setEditedUser({ ...editedUser!, email: e.target.value })
              }
            />
          ) : (
            <p className="text-black-opacity-50 flex-1 ml-1">{user?.email}</p>
          )}
          <FontAwesomeIcon
            icon={isEditing ? faSave : faPen}
            className="ml-2 text-custom-dark cursor-pointer"
            onClick={isEditing ? handleSave : handleEdit}
          />
        </div>
        <hr className="border-t border-custom-gray-light mx-auto" />
        <div className="flex items-center">
          <label className="text-custom-dark w-1/3">Nombre y apellido</label>
          {isEditing ? (
            <>
              <input
                type="text"
                className="text-black-opacity-50 flex-1 ml-1 border p-1 text-sm w-1/3"
                value={editedUser?.firstname}
                onChange={(e) =>
                  setEditedUser({ ...editedUser!, firstname: e.target.value })
                }
              />
              <input
                type="text"
                className="text-black-opacity-50 flex-1 ml-1 border p-1 text-sm w-1/3"
                value={editedUser?.lastname}
                onChange={(e) =>
                  setEditedUser({ ...editedUser!, lastname: e.target.value })
                }
              />
            </>
          ) : (
            <p className="text-black-opacity-50 flex-1 ml-1">
              {user?.firstname} {user?.lastname}
            </p>
          )}
          <FontAwesomeIcon
            icon={isEditing ? faSave : faPen}
            className="ml-2 text-custom-dark cursor-pointer"
            onClick={isEditing ? handleSave : handleEdit}
          />
        </div>
        <hr className="border-t border-custom-gray-light mx-auto" />
        <div className="flex items-center">
          <label className="text-custom-dark w-1/3">Teléfono</label>
          {isEditing ? (
            <input
              type="text"
              className="text-black-opacity-50 flex-1 ml-1 border p-1 text-sm w-2/3"
              value={editedUser?.phone}
              onChange={(e) =>
                setEditedUser({ ...editedUser!, phone: e.target.value })
              }
            />
          ) : (
            <p className="text-black-opacity-50 flex-1 ml-1">{user?.phone}</p>
          )}
          <FontAwesomeIcon
            icon={isEditing ? faSave : faPen}
            className="ml-2 text-custom-dark cursor-pointer"
            onClick={isEditing ? handleSave : handleEdit}
          />
        </div>
        <hr className="border-t border-custom-gray-light mx-auto" />
        <div className="flex items-center">
          <label className="text-custom-dark w-1/3">DNI</label>
          <p className="text-black-opacity-50 flex-1 ml-1">{user?.dni}</p>
        </div>
        <hr className="border-t border-custom-gray-light mx-auto" />
      </div>
    </div>
  );
};

export default CardUser;
