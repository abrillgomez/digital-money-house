"use client";
import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import AddCardButton from "@/app/components/cards/AddCardButton";
import CardsList from "@/app/components/cards/CardsList";
import Menu from "@/app/components/menu/Menu";

const CardPage = () => {
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
        <h1 className="block text-2xl pb-4 text-custom-dark font-bold sm:hidden">
          Tarjetas
        </h1>
        <AddCardButton />
        <CardsList />
      </main>
    </div>
  );
};

export default CardPage;
