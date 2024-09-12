import CardTransactionCard from "@/app/components/cards/CardTransactionCard";
import Menu from "@/app/components/menu/Menu";
import React from "react";

const CardTransactionPage = () => {
  return (
    <div className="flex bg-custom-white">
      <Menu />
      <main className="flex-1 p-4 flex flex-col items-center mt-8 min-h-screen">
        <h1 className="block text-2xl text-custom-dark font-bold sm:hidden">
          Cargar dinero
        </h1>
        <CardTransactionCard />
      </main>
    </div>
  );
};

export default CardTransactionPage;
