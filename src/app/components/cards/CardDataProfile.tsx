"use client";
import React, { useEffect, useState } from "react";
import AccountAPI from "./../../../services/account/account.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

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
    <div className="bg-black text-white p-6 rounded-lg shadow-md w-[350px] sm:w-[511px] lg:w-[1003px] mt-6">
      <p className="font-bold text-gray-300 mb-4">
        Copia tu cvu o alias para ingresar o transferir dinero desde otra cuenta
      </p>
      <div className="mb-2">
        <span className="text-gray-400 text-[20px] block">CVU</span>
        <div className="flex items-center justify-between">
          <span>{accountInfo.cvu}</span>
          <FontAwesomeIcon
            icon={faCopy}
            className="text-lime-500 cursor-pointer"
            onClick={() => handleCopy(accountInfo.cvu)}
          />
        </div>
      </div>
      <div className="mt-4">
        <span className="text-gray-400 text-[20px] block">Alias</span>
        <div className="flex items-center justify-between">
          <span>{accountInfo.alias}</span>
          <FontAwesomeIcon
            icon={faCopy}
            className="text-lime-500 cursor-pointer"
            onClick={() => handleCopy(accountInfo.alias)}
          />
        </div>
      </div>
    </div>
  );
};

export default CardDataProfile;
