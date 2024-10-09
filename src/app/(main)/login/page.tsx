"use client";
import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ContinueButton from "../../components/buttons/ContinueButton";
import CreateAccountGrayButton from "@/app/components/buttons/CreateAccountGrayButton";
import { emailSchema } from "@/schemes/login.scheme";

type FormData = {
  email: string;
};

const LoginPage = () => {
  const methods = useForm<FormData>({
    resolver: yupResolver(emailSchema),
    mode: "onBlur",
  });

  const {
    handleSubmit,
    formState: { errors },
    watch,
  } = methods;
  const emailValue = watch("email");
  const isEmailValid = !errors.email && emailValue?.trim() !== "";
  const [loading, setLoading] = useState(true);

  const onSubmit = (data: FormData) => {
    sessionStorage.setItem("email", data.email);
    window.location.href = "/login-password";
  };

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
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-custom-dark text-white">
      <h1 className="text-2xl font-bold">¡Hola! Ingresá tu e-mail</h1>
      <FormProvider {...methods}>
        <form
          className="flex flex-col space-y-4 py-4"
          onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="Correo electrónico"
            {...methods.register("email")}
            className="w-[300px] h-[50px] sm:w-[360px] sm:h-[64px] bg-white border border-gray-300 px-4 py-2 rounded-[10px] text-black text-[18px] mb-2"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <ContinueButton isEnabled={isEmailValid} />
          <CreateAccountGrayButton />
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginPage;
