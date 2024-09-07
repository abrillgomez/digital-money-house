"use client";
import AccountAPI from "@/services/account/account.service";
import React, { useEffect, useState } from "react";

const CardHome = () => {
  const [availableAmount, setAvailableAmount] = useState<number | null>(null);

  useEffect(() => {
    const fetchAccountInfo = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No se encontró el token");
        return;
      }
      try {
        const accountService = new AccountAPI();
        const accountData = await accountService.getAccountInfo(token);
        setAvailableAmount(accountData.available_amount);
      } catch (error) {
        console.error("Error al obtener los datos de la cuenta:", error);
      }
    };

    fetchAccountInfo();
  }, []);

  return (
    <div className="bg-custom-dark w-[350px] md:w-[511px] lg:w-[1006px] h-[230px] rounded-lg flex items-start justify-start p-6 relative">
      <div className="absolute top-6 right-6 flex space-x-3">
        <a href="/cards" className="text-custom-white underline">
          Ver tarjetas
        </a>
        <a href="/profile" className="text-custom-white underline">
          Ver CVU
        </a>
      </div>
      <div className="mt-auto">
        <h1 className="text-custom-white text-[16px] font-bold mb-4">
          Dinero disponible
        </h1>
        {availableAmount !== null ? (
          <p className="text-custom-white text-[36px] font-semibold border-2 border-custom-lime rounded-full px-4 py-2">
            $
            {availableAmount.toLocaleString("es-AR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        ) : (
          <p className="text-custom-gray-light">Cargando...</p>
        )}
      </div>
    </div>
  );
};

export default CardHome;
