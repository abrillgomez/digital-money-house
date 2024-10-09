"use client";
import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import {
  faMoneyBillTransfer,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import Menu from "@/app/components/menu/Menu";
import TransactionCard from "@/app/components/cards/TransactionCard";

const Page = () => {
  const [loading, setLoading] = useState(true);

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

  const handleBankTransferClick = () => {
    window.location.href = "/bank-transfer";
  };

  const handleCardClick = () => {
    window.location.href = "/card-transaction";
  };

  if (loading) {
    return (
      <div className="flex bg-custom-dark justify-center items-center min-h-screen">
        <ClipLoader size={50} color={"#C1FD35"} loading={loading} />
      </div>
    );
  }

  return (
    <div className="flex bg-custom-white">
      <Menu />
      <main className="flex-1 p-4 flex flex-col items-center mt-8 min-h-screen">
        <h1 className="block text-2xl text-custom-dark font-bold mb-4 sm:hidden">
          Cargar dinero
        </h1>
        <TransactionCard
          icon={faMoneyBillTransfer}
          text="Transferencia bancaria"
          onClick={handleBankTransferClick}
        />
        <TransactionCard
          icon={faCreditCard}
          text="Seleccionar tarjeta"
          onClick={handleCardClick}
        />
      </main>
    </div>
  );
};

export default Page;
