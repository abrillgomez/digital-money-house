"use client";
import CardDataProfile from "@/app/components/cards/CardDataProfile";
import Menu from "@/app/components/menu/Menu";
import React from "react";

const TransactionBankPage = () => {
  return (
    <div className="flex bg-custom-white">
      <Menu />
      <main className="flex-1 p-4 flex flex-col items-center mt-8 min-h-screen">
        <CardDataProfile />
      </main>
    </div>
  );
};

export default TransactionBankPage;
