"use client";
import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import MeansOfPaymentButton from "@/app/components/buttons/MeansOfPaymentButton";
import CardDataProfile from "@/app/components/cards/CardDataProfile";
import CardUser from "@/app/components/cards/CardUser";
import Menu from "@/app/components/menu/Menu";

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delay = 200;
    const startTime = performance.now();
    const animate = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      if (elapsed < delay) {
        requestAnimationFrame(animate);
      } else {
        setLoading(false);
      }
    };
    requestAnimationFrame(animate);
    return () => setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex bg-custom-dark justify-center items-center min-h-screen">
        <ClipLoader size={50} color={"#C1FD35"} loading={loading} />
      </div>
    );
  }

  return (
    <div className="bg-custom-white flex">
      <Menu />
      <main className="flex-1 p-4 flex flex-col items-center mt-8 min-h-screen">
        <h1 className="block text-2xl text-custom-dark font-bold mb-4 sm:hidden">
          Perfil
        </h1>
        <CardUser />
        <MeansOfPaymentButton />
        <CardDataProfile />
      </main>
    </div>
  );
};

export default ProfilePage;
