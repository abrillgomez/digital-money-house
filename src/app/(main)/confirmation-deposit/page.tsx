"use client";
import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Menu from "@/app/components/menu/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

interface TransactionData {
  amount: string;
  date: string;
  lastFourDigits: string;
}

const ConfirmationDepositPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [transactionData, setTransactionData] = useState<TransactionData>({
    amount: "",
    date: "",
    lastFourDigits: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const dateString = urlParams.get("date");
      const amount = urlParams.get("amount") ?? "";
      const lastFourDigits = urlParams.get("lastFourDigits") ?? "";

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
      const formattedDate = `${localDate.toLocaleDateString(
        "es-AR",
        optionsDate
      )}, ${localDate.toLocaleTimeString("es-AR", optionsTime)} hs.`;
      setTransactionData({
        amount,
        date: formattedDate,
        lastFourDigits,
      });
    }
  }, []);

  useEffect(() => {
    const delay = 200;
    const startTime = performance.now();
    const animate = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      if (elapsed < delay) {
        requestAnimationFrame(animate);
      } else {
        setLoading(false);
      }
    };
    requestAnimationFrame(animate);
    return () => setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex bg-custom-dark justify-center items-center min-h-screen">
        <ClipLoader size={50} color={"#C1FD35"} loading={loading} />
      </div>
    );
  }

  return (
    <div className="flex bg-custom-white min-h-screen">
      <Menu />
      <main className="flex-1 p-4 flex flex-col justify-center items-center min-h-screen relative">
        <h1 className="block text-2xl text-custom-dark font-bold mb-4 sm:hidden">
          Cargar dinero
        </h1>
        <div className="flex flex-col items-center w-full max-w-[350px] md:max-w-[1006px]">
          <div className="bg-custom-lime w-full h-[148px] p-6 rounded-lg text-center">
            <div className="text-4xl mb-4 text-custom-dark">
              <FontAwesomeIcon icon={faCircleCheck} />
            </div>
            <h2 className="text-xl font-semibold text-custom-dark">
              Ya cargamos el dinero en tu cuenta
            </h2>
          </div>
          <div className="bg-custom-dark w-full p-6 rounded-lg text-white mt-4">
            <h2 className="text-custom-lime font-bold text-[24px] mb-4">
              Revisá que esté todo bien
            </h2>
            <p className="mb-4">{transactionData.date}</p>
            <p className="text-custom-white text-[17px]">
              Vas a cargar
              <span className="font-semibold mt-2 text-custom-lime">
                {" "}
                ${transactionData.amount}{" "}
              </span>
            </p>
            <p className="text-custom-white text-[17px] mt-2">
              de
              <span className="font-semibold mt-2 text-custom-lime">
                {" "}
                Cuenta propia{" "}
              </span>
            </p>
            <p className="text-custom-white text-[17px] mt-2">
              Tarjeta terminada en:
              <span className="font-semibold mt-2 text-custom-lime">
                {" "}
                {transactionData.lastFourDigits}{" "}
              </span>
            </p>
          </div>
          <div className="flex justify-between md:justify-end space-x-4 mt-6 w-full">
            <button
              className="bg-custom-gray-light font-bold text-custom-dark w-full max-w-[350px] md:max-w-[233px] h-[64px] px-4 py-2 rounded-md"
              onClick={() => (window.location.href = "/home")}>
              Ir al inicio
            </button>
            <button className="bg-custom-lime font-bold text-custom-dark w-full max-w-[350px] md:max-w-[233px] h-[64px] px-4 py-2 rounded-md cursor-default">
              Descargar comprobante
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConfirmationDepositPage;
