"use client";
import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputText from "@/app/components/inputs/InputText";
import ContinueButton from "../../components/buttons/ContinueButton";
import CreateAccountGrayButton from "@/app/components/buttons/CreateAccountGrayButton";
import { emailSchema } from "@/schemes/login.scheme";

type FormData = {
  email: string;
};

const LoginPage = () => {
  const methods = useForm({
    resolver: yupResolver(emailSchema),
    mode: "onBlur",
  });

  const { handleSubmit, formState, control } = methods;
  const emailValue = useWatch({ control, name: "email" });
  const isEmailValid =
    !formState.errors.email && emailValue?.includes("@") && emailValue !== "";

  const onSubmit = (data: FormData) => {
    sessionStorage.setItem("email", data.email);
    window.location.href = "/login-password";
  };

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
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-custom-dark text-white">
      <h1 className="text-2xl font-bold">¡Hola! Ingresá tu e-mail</h1>
      <FormProvider {...methods}>
        <form
          className="flex flex-col space-y-4 py-4"
          onSubmit={handleSubmit(onSubmit)}>
          <InputText
            type="email"
            placeholder="Correo electrónico"
            fieldName="email"
          />
          {formState.errors.email && (
            <p className="text-red-500">{formState.errors.email.message}</p>
          )}
          <ContinueButton isEnabled={isEmailValid} />
          <CreateAccountGrayButton />
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginPage;
