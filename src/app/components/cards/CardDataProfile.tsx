"use client";
import React, { useEffect, useState } from "react";
import AccountAPI from "./../../../services/account/account.service";
import { MdContentCopy, MdEdit } from "react-icons/md";
import Swal from "sweetalert2";

interface AccountInfo {
  cvu: string;
  alias: string;
  id: number;
}

const CardDataProfile = () => {
  const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);
  const [newAlias, setNewAlias] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditingAlias, setIsEditingAlias] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAccountInfo = async () => {
      if (token) {
        try {
          const accountAPI = new AccountAPI();
          const data = await accountAPI.getAccountInfo(token);
          setAccountInfo(data);
        } catch (error) {
          console.error("Error al obtener información de la cuenta:", error);
        }
      } else {
        console.error("No se encontró un token válido.");
      }
    };

    fetchAccountInfo();
  }, [token]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    Swal.fire({
      icon: "success",
      title: "Copiado",
      text: `Se ha copiado: ${text}`,
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const handleUpdateAlias = async () => {
    if (accountInfo && newAlias) {
      const aliasPattern = /^[a-zA-Z0-9]+\.[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;
      if (!aliasPattern.test(newAlias)) {
        Swal.fire({
          icon: "error",
          title: "Alias inválido",
          text: "El alias debe tener tres palabras separadas por un punto (.)",
        });
        return;
      }
      setIsUpdating(true);
      try {
        const accountAPI = new AccountAPI();
        await accountAPI.updateAccountAlias(token!, accountInfo.id, newAlias);
        setAccountInfo({ ...accountInfo, alias: newAlias });
        setNewAlias("");
        setIsEditingAlias(false);

        Swal.fire({
          icon: "success",
          title: "Alias actualizado",
          text: "El alias se ha actualizado correctamente",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error actualizando el alias:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema actualizando el alias",
        });
      } finally {
        setIsUpdating(false);
      }
    }
  };

  if (!accountInfo) {
    return <p className="text-custom-dark">Cargando datos...</p>;
  }

  return (
    <div className="bg-custom-dark text-custom-white p-6 rounded-lg shadow-lg w-full max-w-[350px] sm:max-w-[511px] lg:max-w-[1003px] mt-6">
      <p className="font-bold text-white text-[16px] mb-6">
        Copia tu CVU o alias para ingresar o transferir dinero desde otra cuenta
      </p>
      <div className="mb-6">
        <span className="text-[20px] font-bold text-custom-lime">CVU</span>
        <div className="flex items-center justify-between mt-2">
          <span>{accountInfo.cvu}</span>
          <MdContentCopy
            className="text-custom-lime cursor-pointer"
            style={{ width: "24px", height: "24px" }}
            onClick={() => handleCopy(accountInfo.cvu)}
          />
        </div>
      </div>
      <div className="mt-6">
        <span className="text-[20px] font-bold text-custom-lime">Alias</span>
        <div className="flex items-center justify-between mt-2">
          {isEditingAlias ? (
            <input
              type="text"
              value={newAlias}
              onChange={(e) => setNewAlias(e.target.value)}
              placeholder={accountInfo.alias}
              className="w-full text-black p-2 pr-4 rounded"
            />
          ) : (
            <span>{accountInfo.alias}</span>
          )}
          <div className="flex items-center">
            <MdEdit
              className="text-custom-lime cursor-pointer ml-2 mr-2"
              style={{ width: "24px", height: "24px" }}
              onClick={() => {
                setIsEditingAlias(!isEditingAlias);
                setNewAlias(accountInfo.alias);
              }}
            />
            <MdContentCopy
              className="text-custom-lime cursor-pointer"
              style={{ width: "24px", height: "24px" }}
              onClick={() => handleCopy(accountInfo.alias)}
            />
          </div>
        </div>
      </div>
      {isEditingAlias && (
        <div className="mt-4">
          <button
            onClick={handleUpdateAlias}
            disabled={isUpdating || !newAlias.trim()}
            className={`bg-custom-lime text-custom-dark font-bold px-4 py-2 rounded ${
              isUpdating
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-custom-lime-dark"
            }`}>
            {isUpdating ? "Actualizando..." : "Actualizar alias"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CardDataProfile;
