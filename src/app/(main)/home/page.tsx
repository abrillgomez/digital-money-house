import React from "react";
import HomeButton from "@/app/components/buttons/HomeButton";
import ActivityList from "@/app/components/activity/ActivityList";
import Menu from "@/app/components/menu/Menu";
import CardHome from "@/app/components/cards/CardHome";

const HomePage = () => {
  return (
    <div className="flex">
      <Menu />
      <main className="flex-1 p-4 flex flex-col items-center min-h-screen bg-custom-white">
        <h1 className="block text-2xl text-custom-dark font-bold mb-4 sm:hidden">
          Inicio
        </h1>
        <CardHome />
        <div className="w-full max-w-[350px] md:max-w-[511px] lg:max-w-[1006px] flex flex-col lg:flex-row lg:space-x-4 mt-4 space-y-4 lg:space-y-0">
          <HomeButton text="Cargar dinero" />
          <HomeButton text="Pago de servicios" />
        </div>
        <ActivityList />
      </main>
    </div>
  );
};

export default HomePage;
