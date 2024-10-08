"use client";
import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputText from "@/app/components/inputs/InputText";
import ContinueButton from "../../components/buttons/ContinueButton";
import { passwordSchema } from "@/schemes/login.scheme";

const LoginPasswordPage = () => {
  const methods = useForm({
    resolver: yupResolver(passwordSchema),
    mode: "onBlur",
  });

  const {
    formState: { errors, isValid },
    control,
  } = methods;
  const passwordValue = useWatch({ control, name: "password" });
  const isPasswordValid = isValid && passwordValue?.trim() !== "";
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
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-custom-dark text-white">
      <h1 className="text-2xl font-bold">Ingresá tu contraseña</h1>
      <FormProvider {...methods}>
        <form
          className="flex flex-col space-y-4 py-4"
          onSubmit={(e) => e.preventDefault()}>
          <InputText
            type="password"
            placeholder="Contraseña"
            fieldName="password"
          />
          {errors.password && (
            <p className="text-red-500 text-[15px] w-[360px]">
              {errors.password.message}
            </p>
          )}
          <ContinueButton isEnabled={isPasswordValid} />
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginPasswordPage;
