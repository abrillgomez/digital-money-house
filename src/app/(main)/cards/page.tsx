import AddCardButton from "@/app/components/cards/AddCardButton";
import CardsList from "@/app/components/cards/CardsList";
import Menu from "@/app/components/menu/Menu";
import React from "react";

const CardPage = () => {
  return (
    <div className="bg-custom-white flex">
      <Menu />
      <main className="flex-1 p-4 flex flex-col items-center mt-8 min-h-screen">
        <h1 className="block text-2xl font-bold mb-4 sm:hidden">Tarjetas</h1>
        <AddCardButton />
        <CardsList />
      </main>
    </div>
  );
};

export default CardPage;
