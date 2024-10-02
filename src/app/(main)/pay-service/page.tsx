/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Menu from "@/app/components/menu/Menu";
import CardTransactionCard from "@/app/components/cards/CardTransactionCard";

const PayServicePage = () => {
  const [serviceName, setServiceName] = useState<string | null>(null);
  const totalToPay = 5547.25;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("name");
    setServiceName(name);
  }, []);

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
      <main className="flex-1 p-4 flex flex-col justify-center items-center mt-8 min-h-screen">
        <h1 className="block text-custom-dark text-2xl font-bold mb-4 sm:hidden">
          Pagar servicios
        </h1>
        <div className="bg-custom-dark text-white p-6 rounded-lg shadow-lg w-full max-w-[350px] md:max-w-[511px] lg:max-w-[1006px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[24px] text-custom-lime font-semibold mb-6">
              {serviceName}
            </h2>
            <p className="text-gray-300 text-[16px] mb-6 underline">
              Ver detalles del pago
            </p>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg">Total a pagar</span>
            <span className="text-2xl font-bold">${totalToPay.toFixed(2)}</span>
          </div>
        </div>
        <CardTransactionCard />
      </main>
    </div>
  );
};

export default PayServicePage;
