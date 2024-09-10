"use client";
import CardTransactionCard from "@/app/components/cards/CardTransactionCard";
import Menu from "@/app/components/menu/Menu";
import React from "react";

const CardTransactionPage = () => {
  return (
    <div className="flex bg-custom-white">
      <Menu />
      <main className="flex-1 flex flex-col items-center min-h-screen">
        <CardTransactionCard />
      </main>
    </div>
  );
};

export default CardTransactionPage;
