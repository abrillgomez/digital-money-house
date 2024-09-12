"use client";
import CardDataProfile from "@/app/components/cards/CardDataProfile";
import Menu from "@/app/components/menu/Menu";
import React from "react";

const TransactionBankPage = () => {
  return (
    <div className="flex bg-custom-white">
      <Menu />
      <main className="flex-1 p-4 flex flex-col items-center mt-8 min-h-screen">
        <h1 className="block text-2xl text-custom-dark font-bold mb-4 sm:hidden">
          Cargar dinero
        </h1>
        <CardDataProfile />
      </main>
    </div>
  );
};

export default TransactionBankPage;
