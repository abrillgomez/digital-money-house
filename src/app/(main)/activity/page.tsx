import React from "react";
import Menu from "@/app/components/menu/Menu";
import ActivityList from "@/app/components/activity/ActivityList"

const ActivityPage = () => {
  return (
    <div className="flex">
      <Menu />
      <main className="flex-1 p-4 flex flex-col items-center min-h-screen bg-custom-white">
        <h1 className="block text-2xl text-custom-dark font-bold mb-4 sm:hidden">
          Actividad
        </h1>
        <ActivityList />
      </main>
    </div>
  );
};

export default ActivityPage;
