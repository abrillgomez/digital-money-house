"use client";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputText from "@/app/components/inputs/InputText";
import InputNumber from "@/app/components/inputs/InputNumber";
import CreateAccountButton from "@/app/components/buttons/CreateAccountButton";
import signUpScheme from "@/schemes/signup.scheme";

const CreateAccountPage = () => {
  const methods = useForm({
    resolver: yupResolver(signUpScheme),
    mode: "onChange",
  });

  const { handleSubmit, formState, control } = methods;

  const passwordValue = useWatch({ control, name: "password" });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[795px] py-2 bg-custom-dark text-white">
      <h1 className="text-2xl font-bold">Crear Cuenta</h1>
      <FormProvider {...methods}>
        <form
          className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 sm:gap-6"
          onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 col-span-2">
            <div className="flex flex-col gap-4 sm:gap-4">
              <InputText
                type="text"
                placeholder="Nombre*"
                fieldName="firstname"
              />
              {formState.errors.firstname && (
                <p className="text-red-500 w-[300px] sm:w-full">
                  {formState.errors.firstname.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-4 sm:gap-4">
              <InputText
                type="text"
                placeholder="Apellido*"
                fieldName="lastname"
              />
              {formState.errors.lastname && (
                <p className="text-red-500 w-[300px] sm:w-full">
                  {formState.errors.lastname.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-4 sm:gap-4">
              <InputNumber type="number" placeholder="DNI*" fieldName="dni" />
              {formState.errors.dni && (
                <p className="text-red-500 w-[300px] sm:w-full">
                  {formState.errors.dni.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-4 sm:gap-4">
              <InputText
                type="email"
                placeholder="Correo electrónico*"
                fieldName="email"
              />
              {formState.errors.email && (
                <p className="text-red-500 w-[300px] sm:w-full">
                  {formState.errors.email.message}
                </p>
              )}
            </div>
          </div>
          <div className="col-span-2">
            <p className="text-[15.2px] w-[300px] sm:w-full">
              Usa entre 6 y 20 caracteres (debe contener al menos 1 carácter
              especial, una mayúscula y un número)
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 col-span-2">
            <div className="flex flex-col">
              <InputText
                type="password"
                placeholder="Contraseña*"
                fieldName="password"
              />
              {formState.errors.password && (
                <p className="text-red-500 w-[300px] sm:w-full">
                  {formState.errors.password.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <InputText
                type="password"
                placeholder="Confirmar contraseña*"
                fieldName="passwordConfirmed"
              />
              {formState.errors.passwordConfirmed && (
                <p className="text-red-500 w-[300px] sm:w-full">
                  {formState.errors.passwordConfirmed.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <InputNumber
                type="number"
                placeholder="Teléfono*"
                fieldName="phone"
              />
              {formState.errors.phone && (
                <p className="text-red-500 w-[300px] sm:w-full">
                  {formState.errors.phone.message}
                </p>
              )}
            </div>
            <div className="flex">
              <CreateAccountButton />
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateAccountPage;
