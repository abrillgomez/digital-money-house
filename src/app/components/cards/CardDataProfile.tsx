import React, { useEffect, useState } from "react";
import AccountAPI from "./../../../services/account/account.service";
import Swal from "sweetalert2";
import AccountDetailCard from "./AccountDetailCard";

interface AccountInfo {
  cvu: string;
  alias: string;
  id: number;
}

const CardDataProfile = () => {
  const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);
  const [alias, setAlias] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditingAlias, setIsEditingAlias] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAccountInfo = async () => {
      if (!token) {
        console.error("No se encontró un token válido.");
        return;
      }
      try {
        const accountAPI = new AccountAPI();
        const data = await accountAPI.getAccountInfo(token);
        setAccountInfo(data);
        setAlias(data.alias);
      } catch (error) {
        console.error("Error al obtener información de la cuenta:", error);
      }
    };
    fetchAccountInfo();
  }, [token]);

  const showAlert = (
    icon: "success" | "error",
    title: string,
    text: string
  ) => {
    Swal.fire({
      icon,
      title,
      text,
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    showAlert("success", "Copiado", `Se ha copiado: ${text}.`);
  };

  const validateAlias = (alias: string) => {
    const aliasPattern = /^[a-zA-Z0-9]+\.[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;
    if (!aliasPattern.test(alias)) {
      showAlert(
        "error",
        "Alias inválido",
        "El alias debe tener tres palabras separadas por un punto (.)"
      );
      return false;
    }
    return true;
  };

  const handleUpdateAlias = async () => {
    if (!accountInfo || !alias) return;
    if (!validateAlias(alias)) return;
    setIsUpdating(true);
    try {
      const accountAPI = new AccountAPI();
      await accountAPI.updateAccountAlias(token!, accountInfo.id, alias);
      setAccountInfo({ ...accountInfo, alias });
      showAlert(
        "success",
        "Alias actualizado",
        "El alias se ha actualizado correctamente."
      );
    } catch (error) {
      console.error("Error actualizando el alias:", error);
      showAlert("error", "Error", "Hubo un problema actualizando el alias.");
    } finally {
      setIsUpdating(false);
      setIsEditingAlias(false);
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
      <AccountDetailCard
        title="CVU"
        value={accountInfo.cvu}
        onCopy={() => handleCopy(accountInfo.cvu)}
        isEditing={false}
        onEdit={() => {}}
        onInputChange={() => {}}
      />
      <AccountDetailCard
        title="Alias"
        value={isEditingAlias ? alias : accountInfo.alias}
        onCopy={() => handleCopy(accountInfo.alias)}
        isEditing={isEditingAlias}
        onEdit={() => setIsEditingAlias(!isEditingAlias)}
        onInputChange={(e) => setAlias(e.target.value)}
      />
      {isEditingAlias && (
        <div className="mt-4">
          <button
            onClick={handleUpdateAlias}
            disabled={isUpdating || !alias.trim()}
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
