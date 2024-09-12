"use client";
import React, { useEffect, useState } from "react";
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
  const accountAPI = new AccountAPI();

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        const transactionId = localStorage.getItem("selectedTransactionId");
        const token = localStorage.getItem("token");
        if (transactionId && token) {
          const accountInfo = await accountAPI.getAccountInfo(token);
          const accountId = accountInfo.id;
          const transactionData = await transactionsAPI.getTransaction(
            accountId,
            transactionId
          );
          setTransaction(transactionData);
        }
      } catch (error) {
        console.error("Error fetching transaction details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactionDetails();
  }, []);

  const handleGoHome = () => {
    window.location.href = "/home";
  };

  return (
    <div className="flex min-h-screen bg-custom-white">
      <Menu />
      <main className="flex-1 p-4 flex flex-col items-center mt-8 rounded-lg shadow-lg">
        {loading ? (
          <p className="text-custom-dark mt-2">
            Cargando detalles de la transacción...
          </p>
        ) : transaction ? (
          <>
            <div className="bg-custom-dark rounded-lg shadow-lg p-6 w-[1006px]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold flex items-center">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-custom-lime mr-2"
                  />
                  Aprobada
                </h2>
                <span className="text-custom-gray">
                  Creada el{" "}
                  {new Intl.DateTimeFormat("es-ES", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }).format(new Date(transaction.dated))}{" "}
                  a las{" "}
                  {new Intl.DateTimeFormat("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                  }).format(new Date(transaction.dated))}{" "}
                  hs
                </span>
              </div>

              {transaction.type === "Deposit" ? (
                <>
                  <p className="mb-4">
                    <strong className="text-lime-500">Descripción:</strong>{" "}
                    {transaction.description}
                  </p>
                  <p className="mb-4">
                    <strong className="text-lime-500">El monto de:</strong> $
                    {transaction.amount.toFixed(2)}
                  </p>
                  <p className="mb-4">
                    <strong className="text-lime-500">
                      Desde una cuenta propia.
                    </strong>
                  </p>
                  <p className="mb-4">
                    <strong className="text-lime-500">
                      Número de transacción:
                    </strong>{" "}
                    {transaction.id}
                  </p>
                </>
              ) : transaction.type === "Transfer" ? (
                <>
                  <p className="mb-4">
                    <strong className="text-lime-500">Descripción:</strong>{" "}
                    {transaction.description}
                  </p>
                  <p className="mb-4">
                    <strong className="text-lime-500">El monto de:</strong> $
                    {transaction.amount.toFixed(2)}
                  </p>
                  {transaction.amount < 0 ? (
                    <p className="mb-4">
                      <strong className="text-lime-500">Hacia:</strong>{" "}
                      {transaction.destination}
                    </p>
                  ) : (
                    <p className="mb-4">
                      <strong className="text-lime-500">Desde:</strong>{" "}
                      {transaction.origin}
                    </p>
                  )}
                  <p className="mb-4">
                    <strong className="text-lime-500">
                      Número de transacción:
                    </strong>{" "}
                    {transaction.id}
                  </p>
                </>
              ) : (
                <>
                  <p className="mb-4">
                    <strong className="text-lime-500">Descripción:</strong>{" "}
                    {transaction.description}
                  </p>
                  <p className="mb-4">
                    <strong className="text-lime-500">Monto:</strong> $
                    {transaction.amount.toFixed(2)}
                  </p>
                  <p className="mb-4">
                    <strong className="text-lime-500">Fecha:</strong>{" "}
                    {new Date(transaction.dated).toLocaleDateString()}
                  </p>
                  {transaction.type !== "Deposit" && (
                    <>
                      {transaction.type !== "Transfer" ||
                      transaction.amount >= 0 ? (
                        <p className="mb-4">
                          <strong className="text-lime-500">Origen:</strong>{" "}
                          {transaction.origin}
                        </p>
                      ) : null}
                      {transaction.type !== "Transfer" ||
                      transaction.amount <= 0 ? (
                        <p className="mb-4">
                          <strong className="text-lime-500">Destino:</strong>{" "}
                          {transaction.destination}
                        </p>
                      ) : null}
                    </>
                  )}
                  <p className="mb-4">
                    <strong className="text-lime-500">Tipo:</strong>{" "}
                    {transaction.type}
                  </p>
                </>
              )}
            </div>
            <div className="flex justify-end w-[1006px] mt-4">
              <button
                className="font-bold bg-gray-500 text-black px-4 py-2 rounded mr-2"
                onClick={handleGoHome}>
                Ir al inicio
              </button>
              <button className="bg-lime-500 text-black px-4 py-2 rounded font-bold">
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
