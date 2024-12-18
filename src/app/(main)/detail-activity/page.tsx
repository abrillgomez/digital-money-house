"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Menu from "@/app/components/menu/Menu";
import { transactionsAPI } from "../../../services/transactions/transactions.service";
import AccountAPI from "../../../services/account/account.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

interface Transaction {
  id: number;
  dated: string;
  amount: number;
  type: string;
  description: string;
  destination: string;
  origin: string;
}

const DetailActivityPage = () => {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);
  const accountAPI = useMemo(() => new AccountAPI(), []);

  const fetchTransactionDetails = useCallback(async () => {
    try {
      const transactionId = localStorage.getItem("selectedTransactionId");
      const token = localStorage.getItem("token");
      if (!transactionId || !token) return;
      const accountInfo = await accountAPI.getAccountInfo(token);
      const accountId = accountInfo?.id;
      if (!accountId) return;
      const transactionData = await transactionsAPI.getTransaction(
        accountId,
        transactionId
      );
      setTransaction(transactionData);
    } catch (error) {
      console.error("Error fetching transaction details:", error);
    } finally {
      setLoading(false);
    }
  }, [accountAPI]);

  useEffect(() => {
    fetchTransactionDetails();
  }, [fetchTransactionDetails]);

  const handleGoHome = () => {
    window.location.href = "/home";
  };

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

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(date));

  const formatTime = (date: string) =>
    new Intl.DateTimeFormat("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date(date));

  return (
    <div className="flex min-h-screen bg-custom-white">
      <Menu />
      <main className="flex-1 p-4 flex flex-col items-center mt-8 rounded-lg shadow-lg">
        <h1 className="block text-2xl text-custom-dark font-bold mb-4 sm:hidden">
          Actividad
        </h1>
        {transaction ? (
          <>
            <div className="bg-custom-dark rounded-lg shadow-lg p-6 sm:w-[350px] md:w-[511px] lg:w-[1006px]">
              <div className="flex items-center justify-between mb-4 flex-wrap">
                <h2 className="flex-start text-2xl font-semibold flex items-center">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-custom-lime mr-2"
                  />
                  Aprobada
                </h2>
                <span className="text-custom-gray w-[302px] mt-4 md:mt-0 flex-end">
                  Creada el {formatDate(transaction.dated)} a las{" "}
                  {formatTime(transaction.dated)} hs.
                </span>
              </div>
              {transaction.type === "Deposit" ? (
                <>
                  <p className="mb-4">
                    <strong className="text-custom-lime">Descripción:</strong>{" "}
                    {transaction.description}
                  </p>
                  <p className="mb-4">
                    <strong className="text-custom-lime">El monto de:</strong> $
                    {transaction.amount.toFixed(2)}
                  </p>
                  <p className="mb-4">
                    <strong className="text-custom-lime">
                      Desde una cuenta propia.
                    </strong>
                  </p>
                  <p className="mb-4">
                    <strong className="text-custom-lime">
                      Número de transacción:
                    </strong>{" "}
                    {transaction.id}
                  </p>
                </>
              ) : transaction.type === "Transaction" ? (
                <>
                  <p className="mb-4">
                    <strong className="text-custom-lime">Descripción:</strong>{" "}
                    {transaction.description}
                  </p>
                  <p className="mb-4">
                    <strong className="text-custom-lime">Monto:</strong> $
                    {transaction.amount.toFixed(2)}
                  </p>
                </>
              ) : transaction.type === "Transfer" ? (
                <>
                  <p className="mb-4">
                    <strong className="text-custom-lime">Descripción:</strong>{" "}
                    {transaction.description}
                  </p>
                  <p className="mb-4">
                    <strong className="text-custom-lime">El monto de:</strong> $
                    {transaction.amount.toFixed(2)}
                  </p>
                  {transaction.amount < 0 ? (
                    <p className="mb-4">
                      <strong className="text-custom-lime">Hacia:</strong>{" "}
                      {transaction.destination}
                    </p>
                  ) : (
                    <p className="mb-4">
                      <strong className="text-custom-lime">Desde:</strong>{" "}
                      {transaction.origin}
                    </p>
                  )}
                  <p className="mb-4">
                    <strong className="text-custom-lime">
                      Número de transacción:
                    </strong>{" "}
                    {transaction.id}
                  </p>
                </>
              ) : (
                <>
                  <p className="mb-4">
                    <strong className="text-custom-lime">Descripción:</strong>{" "}
                    {transaction.description}
                  </p>
                  <p className="mb-4">
                    <strong className="text-custom-lime">Monto:</strong> $
                    {transaction.amount.toFixed(2)}
                  </p>
                  <p className="mb-4">
                    <strong className="text-custom-lime">Fecha:</strong>{" "}
                    {formatDate(transaction.dated)}
                  </p>
                  <p className="mb-4">
                    <strong className="text-custom-lime">Tipo:</strong>{" "}
                    {transaction.type}
                  </p>
                </>
              )}
            </div>
            <div className="flex justify-end sm:w-[350px] md:w-[511px] lg:w-[1006px] mt-4">
              <button
                className="bg-custom-gray-light font-bold text-custom-dark w-full max-w-[350px] md:max-w-[233px] h-[64px] px-4 py-2 rounded-md mr-4"
                onClick={() => (window.location.href = "/home")}>
                Ir al inicio
              </button>
              <button className="bg-custom-lime font-bold text-custom-dark w-full max-w-[350px] md:max-w-[233px] h-[64px] px-4 py-2 rounded-md cursor-default">
                Descargar comprobante
              </button>
            </div>
          </>
        ) : (
          <p className="text-custom-dark mt-2">
            No se encontró la transacción.
          </p>
        )}
      </main>
    </div>
  );
};

export default DetailActivityPage;
