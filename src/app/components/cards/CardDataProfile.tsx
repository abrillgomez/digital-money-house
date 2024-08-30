"use client";
import React, { useEffect, useState } from "react";
import { MdContentCopy } from "react-icons/md";
import AccountAPI from "@/services/account/account.service";

const CardDataProfile = () => {
  const [accountInfo, setAccountInfo] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const accountAPI = new AccountAPI();
        const data = await accountAPI.getAccountInfo(token);
        setAccountInfo(data);
      } catch (error) {
        console.error("Error fetching account info:", error);
      }
    };

    fetchAccountInfo();
  }, [token]);

  if (!accountInfo) {
    return <p>Cargando datos...</p>;
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-custom-dark text-white p-6 rounded-lg shadow-md w-[1003px] h-[264px] mt-6">
      <p className="font-bold text-white text-[16px] mb-6">
        Copia tu CVU o alias para ingresar o transferir dinero desde otra cuenta
      </p>
      <div className="mb-6">
        <span className="text-[20px] font-bold text-custom-lime">CVU</span>
        <div className="flex items-center justify-between mt-2">
          <span>{accountInfo.cvu}</span>
          <MdContentCopy
            className="text-custom-lime cursor-pointer"
            style={{ width: "38px", height: "32px" }}
            onClick={() => handleCopy(accountInfo.cvu)}
          />
        </div>
      </div>
      <div className="mt-6">
        <span className="text-[20px] font-bold text-custom-lime">Alias</span>
        <div className="flex items-center justify-between mt-2">
          <span>{accountInfo.alias}</span>
          <MdContentCopy
            className="text-custom-lime cursor-pointer"
            style={{ width: "38px", height: "32px" }}
            onClick={() => handleCopy(accountInfo.alias)}
          />
        </div>
      </div>
    </div>
  );
};

export default CardDataProfile;
