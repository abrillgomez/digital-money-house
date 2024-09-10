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
