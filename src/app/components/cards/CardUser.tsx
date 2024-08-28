"use client";
import React, { useEffect, useState } from "react";
import UserAPI from "../../../services/users/users.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

interface User {
  dni: number;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  phone: string;
}

const AccountCard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mx-auto bg-white rounded-lg shadow-lg p-6 w-[1003px] rounded-[10px]">
      <h2 className="text-[20px] font-bold mb-4 text-black">Tus datos</h2>
      <div className="space-y-2">
        <div className="flex gap-x-2 items-center">
          <label className="text-custom-dark">Email:</label>
          <p className="text-black-opacity-50">{user?.email}</p>
          <FontAwesomeIcon
            icon={faPen}
            className="ml-2 text-custom-dark cursor-pointer"
          />
        </div>
        <div className="flex gap-x-2 items-center">
          <label className="text-custom-dark">Nombre y apellido:</label>
          <p className="text-black-opacity-50">
            {user?.firstname} {user?.lastname}
          </p>
          <FontAwesomeIcon
            icon={faPen}
            className="ml-2 text-custom-dark cursor-pointer"
          />
        </div>
        <div className="flex gap-x-2 items-center">
          <label className="text-custom-dark">Teléfono:</label>
          <p className="text-black-opacity-50">{user?.phone}</p>
          <FontAwesomeIcon
            icon={faPen}
            className="ml-2 text-custom-dark cursor-pointer"
          />
        </div>
        <div className="flex gap-x-2 items-center">
          <label className="text-custom-dark">DNI:</label>
          <p className="text-black-opacity-50">{user?.dni}</p>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
