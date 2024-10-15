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
    if (!token) {
      setLoading(false);
      setError("Token no encontrado en el localStorage");
      return;
    }
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
        })
        .catch(() => {
          setError("Error al obtener los datos del usuario");
        })
        .finally(() => {
          setLoading(false);
        });
    } catch {
      setError("Error al decodificar el token");
      setLoading(false);
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editedUser || !user?.id) {
      Swal.fire(
        "Error",
        "No se puede guardar sin un ID de usuario válido.",
        "error"
      );
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire("Error", "Token no encontrado.", "error");
      return;
    }
    try {
      await UserAPI.updateUserData(token, user.id, editedUser);
      setUser(editedUser);
      setIsEditing(false);
      Swal.fire({
        title: "Actualizado",
        text: "Tus datos han sido actualizados.",
        icon: "success",
      }).then(() => {
        window.location.reload();
      });
    } catch {
      Swal.fire("Error", "No se pudieron actualizar los datos.", "error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof User
  ) => {
    if (editedUser) {
      setEditedUser({ ...editedUser, [field]: e.target.value });
    }
  };

  if (loading) return <p className="text-custom-dark">Cargando...</p>;
  if (error) return <p className="text-custom-dark">Error: {error}.</p>;

  const labelTranslations: Record<string, string> = {
    email: "Email",
    firstname: "Nombre",
    lastname: "Apellido",
    phone: "Teléfono",
  };

  return (
    <div className="mx-auto bg-white rounded-lg shadow-lg p-6 w-full max-w-[350px] sm:max-w-[511px] lg:max-w-[1006px] border border-custom-gray">
      <h2 className="text-xl font-bold mb-4 text-custom-dark">Tus datos</h2>
      <div className="space-y-4">
        {["email", "firstname", "lastname", "phone"].map((field) => (
          <div className="flex items-center gap-x-2" key={field}>
            <label className="text-custom-dark w-[150px]">
              {labelTranslations[field]}
            </label>
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  className="border border-custom-gray p-2 rounded-lg w-full text-black-opacity-50"
                  value={editedUser?.[field as keyof User] || ""}
                  onChange={(e) => handleChange(e, field as keyof User)}
                />
              ) : (
                <p className="text-black-opacity-50">
                  {user?.[field as keyof User]}
                </p>
              )}
            </div>
            <FontAwesomeIcon
              icon={isEditing ? faSave : faPen}
              className="text-custom-dark cursor-pointer"
              onClick={isEditing ? handleSave : handleEdit}
            />
          </div>
        ))}
        <div className="flex items-center gap-x-2">
          <label className="text-custom-dark w-[150px]">DNI</label>
          <div className="flex-1">
            <p className="text-black-opacity-50">{user?.dni}</p>
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <label className="text-custom-dark w-[150px]">Contraseña</label>
          <div className="flex-1">
            <p className="text-black-opacity-50">******</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardUser;
