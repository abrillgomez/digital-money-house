"use client";
import React from "react";
import {
  faMoneyBillTransfer,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import Menu from "@/app/components/menu/Menu";
import TransactionCard from "@/app/components/cards/TransactionCard";

const Page = () => {
  const handleBankTransferBancariaClick = () => {
    window.location.href = "/bank-transfer";
  };

  const handleCardClick = () => {
    window.location.href = "/card-transaction";
  };

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
          onClick={handleBankTransferBancariaClick}
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
