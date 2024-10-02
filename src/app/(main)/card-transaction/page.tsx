"use client";
import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import CardTransactionCard from "@/app/components/cards/CardTransactionCard";
import Menu from "@/app/components/menu/Menu";

const CardTransactionPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let start: number | null = null;
    const delay = 200;
    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      if (elapsed < delay) {
        requestAnimationFrame(animate);
      } else {
        setLoading(false);
      }
    };
    requestAnimationFrame(animate);
  }, []);

  if (loading) {
    return (
      <div className="flex bg-custom-dark justify-center items-center min-h-screen">
        <ClipLoader size={50} color={"#C1FD35"} loading={loading} />
      </div>
    );
  }

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
