"use client";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputText from "@/app/components/inputs/InputText";
import ContinueButton from "../../components/buttons/ContinueButton";
import CreateAccountGrayButton from "@/app/components/buttons/CreateAccountGrayButton";
import { emailSchema } from "@/schemes/login.scheme";

const LoginPage = () => {
  const methods = useForm({
    resolver: yupResolver(emailSchema),
    mode: "onChange",
  });

  const { handleSubmit, formState, control } = methods;
  const emailValue = useWatch({ control, name: "email" });
  const isEmailValid =
    !formState.errors.email && emailValue?.includes("@") && emailValue !== "";

  const onSubmit = (data) => {
    sessionStorage.setItem("email", data.email);
    window.location.href = "/login-password";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[795px] py-2 bg-custom-dark text-white">
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
        </form>
        <ContinueButton isEnabled={isEmailValid} />
        <CreateAccountGrayButton />
      </FormProvider>
    </div>
  );
};

export default LoginPage;
