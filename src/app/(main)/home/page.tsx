import Menu from "@/app/components/menu/Menu";
import React from "react";

const HomePage = () => {
  return (
    <div className="flex">
      <Menu />
      <main className="flex-1 p-4 bg-white">
        <div className="text-black">Home Page</div>
      </main>
    </div>
  );
};

export default HomePage;
