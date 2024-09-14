/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import Menu from "@/app/components/menu/Menu";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { accountScheme } from "@/schemes/account-number.scheme";

const AccountNumberPage = () => {
  const methods = useForm({
    resolver: yupResolver(accountScheme),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: any) => {
    console.log("Número de cuenta válido:", data.accountNumber);
  };

  return (
    <div className="flex bg-custom-white">
      <Menu />
      <main className="flex-1 p-4 flex flex-col items-center mt-8 min-h-screen">
        <div className="bg-custom-dark text-white p-8 rounded-lg shadow-lg w-[1006px] w-full">
          <h2 className="text-left text-custom-lime text-2xl font-bold mb-6">
            Número de cuenta sin el primer 2
          </h2>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
              <input
                type="text"
                {...methods.register("accountNumber")}
                maxLength={11}
                className={`w-[300px] h-[64px] p-2 mb-4 rounded-lg text-black ${
                  errors.accountNumber ? "border-red-500" : ""
                }`}
                placeholder="37289701912"
              />
              {errors.accountNumber && (
                <p className="text-red-500 mb-4">
                  {errors.accountNumber.message}
                </p>
              )}
              <p className="text-sm text-gray-400 mb-4">
                Son 11 números sin espacios, sin el "2" inicial. Agregá ceros
                adelante si tenés menos.
              </p>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="w-[233px] h-[64px] py-2 rounded-lg bg-custom-lime text-black font-bold">
                  Continuar
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </main>
    </div>
  );
};

export default AccountNumberPage;
