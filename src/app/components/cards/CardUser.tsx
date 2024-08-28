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

  if (loading) return <p className="text-custom-dark">Cargando...</p>;
  if (error) return <p className="text-custom-dark">Error: {error}</p>;

  return (
    <div className="mx-auto bg-white rounded-lg shadow-lg p-6 w-[1006px] rounded-[10px]">
      <h2 className="text-[20px] font-bold mb-4 text-black">Tus datos</h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <label className="text-custom-dark w-1/3">Email</label>
          <p className="text-black-opacity-50 flex-1 ml-1">{user?.email}</p>
          <FontAwesomeIcon
            icon={faPen}
            className="text-custom-dark cursor-pointer"
          />
        </div>
        <hr className="border-t border-custom-gray-light mx-auto" />
        <div className="flex items-center">
          <label className="text-custom-dark w-1/3">Nombre y apellido</label>
          <p className="text-black-opacity-50 flex-1 ml-1">
            {user?.firstname} {user?.lastname}
          </p>
          <FontAwesomeIcon
            icon={faPen}
            className="text-custom-dark cursor-pointer"
          />
        </div>
        <hr className="border-t border-custom-gray-light mx-auto" />
        <div className="flex items-center">
          <label className="text-custom-dark w-1/3">Teléfono</label>
          <p className="text-black-opacity-50 flex-1 ml-1">{user?.phone}</p>
          <FontAwesomeIcon
            icon={faPen}
            className="text-custom-dark cursor-pointer"
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

export default AccountCard;
