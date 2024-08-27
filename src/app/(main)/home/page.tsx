import React from "react";
import HomeButton from "@/app/components/buttons/HomeButton";
import Menu from "@/app/components/menu/Menu";
import CardHome from "@/app/components/cards/CardHome";
import ActivityList from "@/app/components/activity/ActivityList";

const HomePage = () => {
  return (
    <div className="bg-custom-white flex">
      <Menu />
      <main className="flex-1 p-4 flex flex-col items-center mt-8">
        <CardHome />
        <div className="flex space-x-4 mt-4">
          <HomeButton text="Cargar dinero" />
          <HomeButton text="Pago de servicios" />
        </div>
        <ActivityList />
      </main>
    </div>
  );
};

export default HomePage;
