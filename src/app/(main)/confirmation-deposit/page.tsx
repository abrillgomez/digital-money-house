"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Menu from "@/app/components/menu/Menu";

interface TransactionData {
  amount: string;
  date: string;
  lastFourDigits: string;
}

const ConfirmationDepositPage: React.FC = () => {
  const [transactionData, setTransactionData] = useState<TransactionData>({
    amount: "",
    date: "",
    lastFourDigits: "",
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const dateString = urlParams.get("date") || "";
      const amount = urlParams.get("amount") || "";
      const lastFourDigits = urlParams.get("lastFourDigits") || "";
      const utcDate = dateString ? new Date(dateString) : new Date();
      const localDate = new Date(
        utcDate.toLocaleString("en-US", {
          timeZone: "America/Argentina/Buenos_Aires",
        })
      );
      const optionsDate: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      };
      const optionsTime: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const formattedDate = localDate.toLocaleDateString("es-AR", optionsDate);
      const formattedTime = localDate.toLocaleTimeString("es-AR", optionsTime);

      setTransactionData({
        amount,
        date: `${formattedDate}, ${formattedTime}hs.`,
        lastFourDigits,
      });
    }
  }, []);

  console.log(transactionData.date);
  return (
    <div className="flex bg-custom-white min-h-screen">
      <Menu />
      <main className="flex-1 p-6 flex flex-col items-center justify-center relative">
        <div className="flex flex-col items-center w-full max-w-[1006px]">
          <div className="bg-custom-lime w-full h-[148px] p-6 rounded-lg text-center">
            <div className="text-4xl mb-4 text-custom-dark">
              <FontAwesomeIcon icon={faCircleCheck} />
            </div>
            <h2 className="text-xl font-semibold text-custom-dark">
              Ya cargamos el dinero en tu cuenta
            </h2>
          </div>
          <div className="bg-custom-dark w-full h-[365px] p-6 rounded-lg text-custom-white mt-4">
            <h2 className="text-custom-lime font-bold text-[24px] mb-4">
              Revisá que esté todo bien
            </h2>
            <p className="mb-4">{transactionData.date}</p>
            <p className="text-custom-white">Vas a cargar</p>
            <p className="text-[20px] font-semibold mt-2 text-custom-lime">
              ${transactionData.amount}
            </p>
            <p className="mt-4">de</p>
            <p className="text-[20px] font-semibold mt-2 text-custom-lime">
              Cuenta propia
            </p>
            <p className="text-custom-white mt-4">Tarjeta terminada en:</p>
            <p className="text-[20px] font-semibold mt-2 text-custom-lime">
              {transactionData.lastFourDigits}
            </p>
          </div>
          <div className="flex justify-end space-x-4 mt-6 w-full">
            <button
              className="bg-custom-gray-light font-bold text-custom-dark w-[233px] h-[64px] px-4 py-2 rounded-md"
              onClick={() => (window.location.href = "/home")}>
              Ir al inicio
            </button>
            <button className="bg-custom-lime font-bold text-custom-dark w-[233px] h-[64px] px-4 py-2 rounded-md">
              Descargar comprobante
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConfirmationDepositPage;
