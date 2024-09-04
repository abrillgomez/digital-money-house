import MeansOfPaymentButton from "@/app/components/buttons/MeansOfPaymentButton";
import CardDataProfile from "@/app/components/cards/CardDataProfile";
import CardUser from "@/app/components/cards/CardUser";
import Menu from "@/app/components/menu/Menu";
import React from "react";

const ProfilePage = () => {
  return (
    <div className="bg-custom-white flex">
      <Menu />
      <main className="flex-1 p-4 flex flex-col items-center mt-8">
        <CardUser />
        <MeansOfPaymentButton />
        <CardDataProfile />
      </main>
    </div>
  );
};

export default ProfilePage;